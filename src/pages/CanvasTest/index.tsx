import React, { useRef, useEffect } from 'react';
import styles from './index.less';
import DrawGrid from '@/components/DrawGrid';

let isMouseDown = false;
function CanvasTest() {
  const canvas: any = useRef(null);
  let ctx: any = null;
  let a: any = null;

  useEffect(() => {
    ctx = canvas.current.getContext('2d');
    a = canvas.current.getBoundingClientRect();
    drawArc(50, 50, 'black');
  }, []);
  const round = (xy: number, step: number) => {
    return Math.round(xy / step);
  };
  const drawArc = (x: number, y: number, color: string) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.font = '14px Arial';
    ctx.fillText('S1', x - 8, y + 5);
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  };
  const mouseDown = (e: any) => {
    let x = e.clientX - a.x;
    let y = e.clientY - a.y;
    if (ctx.isPointInPath(x, y)) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      isMouseDown = true;
      drawArc(x, y, 'red');
    }
  };
  const mouseMove = (e: any) => {
    if (isMouseDown) {
      let x = e.clientX - a.x;
      let y = e.clientY - a.y;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawArc(x, y, 'red');
    }
  };
  const mouseUp = (e: any) => {
    if (isMouseDown) {
      isMouseDown = false;
      let x = round(e.clientX - a.x, 50) * 50;
      let y = round(e.clientY - a.y, 50) * 50;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      console.log(x, y);
      if (x < 250) {
        drawArc(50, 50, 'black');
      } else {
        drawArc(x, y, 'black');
      }
    }
  };
  return (
    <div className={styles.canvasTest}>
      <DrawGrid styleName="canvasB" width="1500" height="800" />
      <canvas
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        className={styles.canvas}
        width="1500"
        height="800"
        ref={canvas}
      />
    </div>
  );
}

export default CanvasTest;
