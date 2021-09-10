import React, { useRef, useEffect } from 'react';
import styles from './styles.less';

function DrawGrid(props: any) {
  const canvasB: any = useRef(null);
  let ctxB: any = null;

  useEffect(() => {
    ctxB = canvasB.current.getContext('2d');
    drawGrid(250, 50, 50, 50);
  }, []);

  const drawGrid = (
    xStart: number,
    yStart: number,
    stepx: number,
    stepy: number,
  ) => {
    ctxB.fillStyle = 'black'; //颜色
    ctxB.lineWidth = 0.5;
    ctxB.strokeStyle = '#ccc';
    // 画竖线
    for (let i = xStart; i < ctxB.canvas.width; i += stepx) {
      ctxB.beginPath();
      ctxB.moveTo(i, 0);
      ctxB.lineTo(i, ctxB.canvas.height);
      ctxB.closePath();
      ctxB.stroke();
    }
    // 画横线
    for (let i = yStart; i < ctxB.canvas.height; i += stepy) {
      ctxB.beginPath();
      ctxB.moveTo(xStart, i);
      ctxB.lineTo(ctxB.canvas.width, i);
      ctxB.closePath();
      ctxB.stroke();
    }
    ctxB.font = '20px Arial';
    ctxB.fillText('S Point', 5, 20);
    ctxB.fillText('D Point', 5, 420);
  };
  return (
    <canvas
      className={styles[props.styleName]}
      width={props.width}
      height={props.height}
      ref={canvasB}
    />
  );
}

export default DrawGrid;
