import { useEffect, useRef, useState } from 'react';
import { toolIcons } from '../tool-icons.js';

export function ToolsCarousel({ text }) {
  const card = useRef(null);
  const track = useRef(null);
  const move = useRef(() => {});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = card.current;
    const strip = track.current;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let offset = 0,
      width = 0,
      step = 0,
      frame,
      lastTime;
    let hovering = false,
      focused = false,
      visible = true;
    const shift = (amount) => {
      if (!width) return;
      offset = (((offset + amount) % width) + width) % width;
      strip.style.transform = `translateX(${-offset}px)`;
    };
    move.current = (direction) => shift(direction * step);
    const measure = () => {
      width = strip.firstElementChild.getBoundingClientRect().width;
      step = strip.querySelector('.tool-item').getBoundingClientRect().width;
      shift(0);
    };
    const allowed = () =>
      !paused && !hovering && !focused && visible && !motion.matches && !document.hidden;
    const tick = (time) => {
      if (!allowed()) return;
      if (lastTime !== undefined) shift(Math.min(time - lastTime, 50) * 0.022);
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      lastTime = undefined;
      if (allowed()) frame = requestAnimationFrame(tick);
    };
    const enter = () => {
      hovering = true;
      restart();
    };
    const leave = () => {
      hovering = false;
      restart();
    };
    const focus = () => {
      focused = true;
      restart();
    };
    const blur = (event) => {
      focused = element.contains(event.relatedTarget);
      restart();
    };
    const listeners = [
      [element, 'mouseenter', enter],
      [element, 'mouseleave', leave],
      [element, 'focusin', focus],
      [element, 'focusout', blur],
      [document, 'visibilitychange', restart],
      [motion, 'change', restart],
    ];
    listeners.forEach(([target, event, handler]) => target.addEventListener(event, handler));
    const resize = new ResizeObserver(measure);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    resize.observe(element);
    intersection.observe(element);
    measure();
    restart();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      listeners.forEach(([target, event, handler]) => target.removeEventListener(event, handler));
    };
  }, [paused]);

  return (
    <div ref={card} className="glass daily-card" aria-label={text.daily}>
      <div className="daily-heading">
        <div>
          <span className="card-label">{text.dailyHint}</span>
          <h2>{text.daily}</h2>
        </div>
        <button
          className="carousel-pause"
          type="button"
          aria-label={text[paused ? 'resume' : 'pause']}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? '▷' : 'Ⅱ'}
        </button>
      </div>
      <div className="carousel">
        <button
          className="carousel-arrow previous"
          type="button"
          aria-label={text.previous}
          onClick={() => move.current(-1)}
        >
          ‹
        </button>
        <div className="tool-window">
          <div ref={track} className="tool-track">
            {[0, 1, 2].map((group) => (
              <div className="tool-group" key={group} aria-hidden={group !== 0 ? true : undefined}>
                {Object.entries(toolIcons).map(([name, path]) => (
                  <div className="tool-item" key={name}>
                    <span className="tool-icon">
                      <svg
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        dangerouslySetInnerHTML={{ __html: path }}
                      />
                    </span>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          className="carousel-arrow next"
          type="button"
          aria-label={text.next}
          onClick={() => move.current(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
