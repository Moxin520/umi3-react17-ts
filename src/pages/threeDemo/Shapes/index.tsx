import React, { useRef, useEffect } from 'react';
import styles from '../index.less';
import * as THREE from 'three';
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
import { OrbitControls } from 'three-orbitcontrols-ts';
import Stats from 'stats.js';
function Shapes() {
  const statsDom = useRef<HTMLDivElement | null>(null); //初始化统计对象threeDom
  const threeDom = useRef<HTMLDivElement | null>(null); //初始化统计对象threeDom
  const initStats = () => {
    let stats: any = new Stats(); //设置统计模式
    stats.setMode(0); // 0: fps, 1: ms //统计信息显示在左上角
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '5px';
    stats.domElement.style.top = '5px';
    if (statsDom.current) {
      statsDom.current.appendChild(stats.domElement);
    }
    return stats;
  };

  let stats: any = null;
  let camera: any = null;
  let loader = new OBJLoader();
  let scene = new THREE.Scene();
  let axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);
  let renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(window.innerWidth - 300, window.innerHeight - 300);
  const cameraStting = (x: number, y: number, z: number) => {
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(x, y, z);
    // 设置正向与z同轴
    camera.up.set(0, 0, 1);
    camera.lookAt(scene.position);
  };
  const addLight = (x: number, y: number, z: number, color: number) => {
    let light = new THREE.PointLight(color);
    light.position.set(x, y, z);
    light.castShadow = true;
    return light;
  };
  useEffect(() => {
    stats = initStats();
    if (threeDom.current) {
      threeDom.current.appendChild(renderer.domElement);
    }
    scene.add(addLight(0, 500, 500, 0xffffff));
    scene.add(addLight(0, -500, -500, 0xffffff));

    cameraStting(0, 0, 500);
    let controls = new OrbitControls(camera, renderer.domElement);
    initClosedSpline();
    getRandomPoints();
    getStar();
    renderScene();
  }, []);

  const initClosedSpline = () => {
    // 创建闭合曲线 路径上的点 决定线条行走路线
    var closedSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-60, -100, 60),
      new THREE.Vector3(-60, 20, 60),
      new THREE.Vector3(-60, 120, 60),
      new THREE.Vector3(60, 20, -60),
      new THREE.Vector3(60, -100, 60),
      new THREE.Vector3(60, -120, -60),
    ]);

    closedSpline.curveType = 'catmullrom';
    // 设置曲线闭环 首位相接
    closedSpline.closed = true;

    var extrudeSettings = {
      steps: 2000,
      bevelEnabled: true,
      extrudePath: closedSpline,
    };

    // 决定线条横切面形状
    var pts = [],
      count = 3;
    for (var i = 0; i < count; i++) {
      var l = 20;
      var a = ((2 * i) / count) * Math.PI;
      pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
    }
    // 使用路径决定一个二维平面的形状
    var shape = new THREE.Shape(pts);
    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    var material = new THREE.MeshLambertMaterial({
      color: 0xb00000,
      wireframe: false,
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  };

  const getRandomPoints = () => {
    // 创建蛇形曲线
    var randomPoints = [];
    for (var i = 0; i < 10; i++) {
      randomPoints.push(
        new THREE.Vector3(
          (i - 4) * 50,
          THREE.Math.randFloat(-60, 60),
          THREE.Math.randFloat(-60, 60),
        ),
      );
    }
    // 从一系列的点创建一条平滑的三维样条曲线
    var randomSpline = new THREE.CatmullRomCurve3(randomPoints);
    var extrudeSettings = {
      steps: 2000,
      bevelEnabled: false,
      extrudePath: randomSpline,
    };
    var pts = [],
      numPts = 5;
    for (var i = 0; i < numPts * 2; i++) {
      var l = i % 2 == 1 ? 10 : 20;
      var a = (i / numPts) * Math.PI;
      pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
    }
    var shape = new THREE.Shape(pts);
    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    var material2 = new THREE.MeshLambertMaterial({
      color: 0xff8000,
      wireframe: false,
    });
    var mesh = new THREE.Mesh(geometry, material2);
    scene.add(mesh);
  };

  const getStar = () => {
    // 创建星型
    var material2 = new THREE.MeshLambertMaterial({
      color: 0xff8000,
      wireframe: false,
    });
    var material = new THREE.MeshLambertMaterial({
      color: 0xb00000,
      wireframe: false,
    });
    var pts = [],
      numPts = 5;

    for (var i = 0; i < numPts * 2; i++) {
      var l = i % 2 == 1 ? 10 : 20;
      var a = (i / numPts) * Math.PI;
      pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
    }
    var x = 0,
      y = 0;

    var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths

    heartShape.moveTo(x + 25, y + 25);
    heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
    heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
    heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
    heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
    heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
    heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

    var shape = new THREE.Shape(pts);
    var materials = [material, material2];
    var extrudeSettings = {
      depth: 5,
      steps: 1000,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 4,
      bevelSegments: 1,
    };
    var geometry = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);
    var mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(50, 50, 50);
    scene.add(mesh);
  };

  const renderScene = () => {
    stats.update();
    //通过requestAnimationFrame方法在特定时间间隔重新渲染场景
    requestAnimationFrame(renderScene);
    //渲染场景
    renderer.render(scene, camera);
  };
  return (
    <div className={styles.addObj}>
      <div ref={threeDom}></div>
      <div ref={statsDom}></div>
    </div>
  );
}

export default Shapes;
