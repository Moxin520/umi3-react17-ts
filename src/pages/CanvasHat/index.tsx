import React, { useRef, useEffect } from 'react';
import { number } from 'yargs';
import styles from './index.less';

let isMouseDown = false;
let sPoint = [
  { index: 1, title: 'S4', x: 4, y: 1 },
  { index: 2, title: 'S3', x: 3, y: 1 },
  { index: 3, title: 'S2', x: 2, y: 1 },
  { index: 4, title: 'S1', x: 1, y: 1 },
];
function CanvasHat() {
  const can: any = useRef(null);
  let ctx: any = null;
  let res: any = {};
  useEffect(() => {
    ctx = can.current.getContext('2d');
    drawSPoint();
    drawGrid(250, 50, 50, 50);
  });
  const aDrawSpoint = (sPoint: any, move: boolean) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.font = '14px Arial';
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red'; //颜色
    if (move) {
      if (sPoint.x > 5) {
        ctx.arc(sPoint.x * 50, sPoint.y * 50, 20, 0, Math.PI * 2, false);
        ctx.fillText(sPoint.title, sPoint.x * 50 - 8, sPoint.y * 50 + 5);
        res = {};
      }
    } else {
      ctx.arc(sPoint.x * 50, sPoint.y * 50, 20, 0, Math.PI * 2, false);
      ctx.fillText(sPoint.title, sPoint.x * 50 - 8, sPoint.y * 50 + 5);
    }
    ctx.closePath();
    ctx.stroke();
  };
  const dragPoint = (sPoint: any) => {
    aDrawSpoint(sPoint, true);
  };
  const drawSPoint = () => {
    for (let i = 0; i < sPoint.length; i++) {
      aDrawSpoint(sPoint[i], false);
    }
  };
  const drawGrid = (
    xStart: number,
    yStart: number,
    stepx: number,
    stepy: number,
  ) => {
    ctx.fillStyle = 'black'; //颜色
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#ccc';
    // 画竖线
    for (let i = xStart; i < ctx.canvas.width; i += stepx) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, ctx.canvas.height);
      ctx.closePath();
      ctx.stroke();
    }
    // 画横线
    for (let i = yStart; i < ctx.canvas.height; i += stepy) {
      ctx.beginPath();
      ctx.moveTo(xStart, i);
      ctx.lineTo(ctx.canvas.width, i);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.font = '20px Arial';
    ctx.fillText('S Point', 10, 20);
    ctx.fillText('D Point', 10, 420);
  };
  const round = (xy: number, step: number) => {
    return Math.round(xy / step);
  };
  const isPointInPath = (x: number, y: number) => {
    let res = sPoint.find((s) => {
      return s.x === x && s.y === y;
    });
    return res;
  };
  const mouseDown = (e: any) => {
    isMouseDown = true;
    let x = round(e.nativeEvent.offsetX - 250, 50);
    let y = round(e.nativeEvent.offsetY, 50);
    res = isPointInPath(x, y);
    console.log('点击按下', x, y, res);
  };
  const mouseMove = (e: any) => {
    if (isMouseDown) {
      let x = round(e.nativeEvent.offsetX - 250, 50);
      let y = round(e.nativeEvent.offsetY, 50);
      console.log('正在移动', x, y);
    }
  };
  const mouseUp = (e: any) => {
    isMouseDown = false;
    let x = round(e.nativeEvent.offsetX - 250, 50);
    let y = round(e.nativeEvent.offsetY, 50);
    if (res?.title) {
      res.x = x;
      res.y = y;
      console.log(111112222222, res);
      dragPoint(res);
    }
    console.log('点击松开', x, y);
  };
  const mouseClick = (e: any) => {
    let x = round(e.nativeEvent.offsetX, 50);
    let y = round(e.nativeEvent.offsetY, 50);
    let r: any = {};
    if (x < 6) {
      r = isPointInPath(x, y);
    }
    if (r?.index) {
      res = r;
      console.log(9999, res);
    } else {
      if (res?.index) {
        console.log(11111111);
        res.x = x;
        res.y = y;
        aDrawSpoint(res, true);
      }
    }
    console.log('点击按下', x, y, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };
  return (
    <div className={styles.canvasHat}>
      <h1>使用canvas画帽子排布</h1>
      <canvas
        // onMouseDown={mouseDown}
        // onMouseMove={mouseMove}
        // onMouseUp={mouseUp}
        onClick={mouseClick}
        ref={can}
        width="1600"
        height="800"
        className={styles.canvas}
      ></canvas>
    </div>
  );
}

export default CanvasHat;
