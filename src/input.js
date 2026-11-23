// Unified keyboard + touchscreen input. Player control is always live input.
export const input = {
  forward: 0,
  strafe: 0,
  sprint: false,
  jumpQueued: false,
  diveQueued: false,
  pauseQueued: false,
  anyQueued: false,
  enabled: false,
  joystickActive: false,
  touch: false,
  keys: new Set(),

  init(gameHooks = {}) {
    this.hooks = gameHooks;
    this.touch = (navigator.maxTouchPoints || 0) > 0 || ('ontouchstart' in window) || window.innerWidth < 820;
    document.body.classList.toggle('no-touch', !this.touch);

    const prevent = e => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    };
    window.addEventListener('keydown', e => {
      if (e.repeat) return;
      prevent(e);
      this.anyQueued = true;
      if (e.code === 'Escape') { this.pauseQueued = true; return; }
      if (!this.enabled) return;
      this.keys.add(e.code);
      if (e.code === 'Space' || e.code === 'KeyW' && false) this.jumpQueued = true;
      if (e.code === 'Space') this.jumpQueued = true;
      if (e.code === 'KeyC' || e.code === 'KeyX') this.diveQueued = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.sprint = true;
      this.recalcKeys();
    });
    window.addEventListener('keyup', e => {
      this.keys.delete(e.code);
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.sprint = false;
      this.recalcKeys();
    });
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.forward = 0; this.strafe = 0; this.sprint = false;
      this.joystickActive = false;
      this.resetJoystick();
    });

    // virtual joystick
    const stick = document.getElementById('joystick');
    const knob = document.getElementById('joystick-knob');
    let pointerId = null;
    const updateStick = (clientX, clientY) => {
      const r = stick.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx = clientX - cx, dy = clientY - cy;
      const max = r.width * 0.34;
      const len = Math.hypot(dx, dy);
      if (len > max) { dx = dx / len * max; dy = dy / len * max; }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      this.strafe = Math.max(-1, Math.min(1, dx / max));
      this.forward = Math.max(-1, Math.min(1, -dy / max));
    };
    stick.addEventListener('pointerdown', e => {
      e.preventDefault();
      pointerId = e.pointerId;
      stick.setPointerCapture(pointerId);
      this.joystickActive = true;
      this.anyQueued = true;
      updateStick(e.clientX, e.clientY);
    });
    stick.addEventListener('pointermove', e => {
      if (e.pointerId !== pointerId) return;
      updateStick(e.clientX, e.clientY);
    });
    const endStick = e => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      this.joystickActive = false;
      this.forward = 0; this.strafe = 0;
      this.resetJoystick();
    };
    stick.addEventListener('pointerup', endStick);
    stick.addEventListener('pointercancel', endStick);

    const hold = (el, fn) => {
      el.addEventListener('pointerdown', e => {
        e.preventDefault();
        this.anyQueued = true;
        fn(true);
      });
      el.addEventListener('pointerup', e => { e.preventDefault(); fn(false); });
      el.addEventListener('pointercancel', () => fn(false));
      el.addEventListener('pointerleave', () => fn(false));
    };
    const jumpBtn = document.getElementById('btn-jump');
    const sprintBtn = document.getElementById('btn-sprint');
    const diveBtn = document.getElementById('btn-dive');
    hold(jumpBtn, down => { if (down) this.jumpQueued = true; jumpBtn.classList.toggle('pressed', down); });
    hold(sprintBtn, down => { this.sprint = down; sprintBtn.classList.toggle('pressed', down); });
    hold(diveBtn, down => { if (down) this.diveQueued = true; diveBtn.classList.toggle('pressed', down); });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.enabled) this.hooks.onHidden?.();
    });
  },

  resetJoystick() {
    const knob = document.getElementById('joystick-knob');
    if (knob) knob.style.transform = '';
  },

  recalcKeys() {
    let x = 0, z = 0;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) z += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) z -= 1;
    if (!this.joystickActive) {
      this.strafe = x;
      this.forward = z;
    }
  },

  consumeJump() { const v = this.jumpQueued; this.jumpQueued = false; return v; },
  consumeDive() { const v = this.diveQueued; this.diveQueued = false; return v; },
  consumePause() { const v = this.pauseQueued; this.pauseQueued = false; return v; },

  setEnabled(v) {
    this.enabled = v;
    if (!v) {
      this.keys.clear();
      this.sprint = false;
      this.joystickActive = false;
      this.forward = 0; this.strafe = 0;
      this.jumpQueued = false; this.diveQueued = false;
      this.resetJoystick();
      document.querySelectorAll('.touch-btn.pressed').forEach(b => b.classList.remove('pressed'));
    }
  }
};
