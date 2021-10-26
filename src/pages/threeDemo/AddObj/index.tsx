import React, { useRef, useEffect } from 'react';
import styles from '../index.less';
import * as THREE from 'three';
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
import { OrbitControls } from 'three-orbitcontrols-ts';
import Stats from 'stats.js';
function AddObj() {
  const statsDom = useRef<HTMLDivElement | null>(null); //初始化统计对象threeDom
  const threeDom = useRef<HTMLDivElement | null>(null); //初始化统计对象threeDom
  let stats: any = null;
  let camera: any = null;
  let loader = new OBJLoader();
  let scene = new THREE.Scene();
  let axesHelper = new THREE.AxesHelper(200);
  let width = window.innerWidth - 300;
  let height = window.innerHeight - 100;
  scene.add(axesHelper);
  let renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(width, height);
  let mouse = new THREE.Vector2();
  let mouseHelper: any = new THREE.Mesh(
    // 创建一个长宽高分别为1，1，10的图形
    new THREE.BoxBufferGeometry(2, 2, 20),
    // 一种把法向量映射到RGB颜色的材质。
    new THREE.MeshNormalMaterial(),
  );
  let mesh: any = null;
  let line: any = null;
  let raycaster = new THREE.Raycaster();
  let intersection = {
    intersects: false,
    point: new THREE.Vector3(),
    normal: new THREE.Vector3(),
  };
  var pointMaterial = new THREE.PointsMaterial({
    color: 0xffffff, //设置颜色，默认 0xFFFFFF
    vertexColors: true, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
    size: 5, //定义粒子的大小。默认为1.0
  });
  let isDbciick = false;
  const cameraStting = (x: number, y: number, z: number) => {
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
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
    addObj();
    cameraStting(0, 350, 0);
    initMouseHelper();
    let controls = new OrbitControls(camera, renderer.domElement);
    renderScene();
  }, []);

  const initMouseHelper = () => {
    mouseHelper.visible = false;
    scene.add(mouseHelper);
    // 创建一条线
    var geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    // LineBasicMaterial一种用于绘制线框样式几何体的材质。
    line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: '#FCA60B' }),
    );
    scene.add(line);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener(
      'dblclick',
      () => {
        isDbciick = true;
        checkIntersection(isDbciick);
      },
      false,
    );
  };
  const onTouchMove = (event: any) => {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = (event.offsetX / width) * 2 - 1;
    mouse.y = -(event.offsetY / height) * 2 + 1;
    isDbciick = false;
    checkIntersection(isDbciick);
  };
  const checkIntersection = (isDbciick: boolean) => {
    // 若无模型相交则不更新法线位置
    if (!mesh) return;
    // 通过摄像机和鼠标位置更新射线位置
    raycaster.setFromCamera(mouse, camera);
    // 计算物体和射线的焦点
    var intersects = raycaster.intersectObjects([mesh]);
    // 如果有焦点
    if (intersects.length > 0) {
      // 复制该焦点所需要的属性值
      var p = intersects[0].point;
      // 位置
      mouseHelper.position.copy(p);
      // point —— 相交部分的点（世界坐标）
      intersection.point.copy(p);
      // face相交的面
      var n = intersects[0].face.normal.clone();
      // 通过传入的矩阵（m的左上角3 x 3子矩阵）变换向量的方向， 并将结果进行normalizes（归一化）。
      n.transformDirection(mesh.matrixWorld);
      // 将该向量与所传入的标量s进行相乘。
      n.multiplyScalar(10);
      // 将传入的向量v和这个向量相加。
      n.add(intersects[0].point);
      intersection.normal.copy(intersects[0].face.normal);
      mouseHelper.lookAt(n);
      // 设置位置信息
      var positions = line.geometry.attributes.position;
      positions.setXYZ(0, p.x, p.y, p.z);
      positions.setXYZ(1, n.x, n.y, n.z);
      // 手动更新数据
      positions.needsUpdate = true;

      intersection.intersects = true;
      if (isDbciick) {
        var n1 = n;
        // 通过传入的矩阵（m的左上角3 x 3子矩阵）变换向量的方向， 并将结果进行normalizes（归一化）。
        n1.transformDirection(mesh.matrixWorld);
        // 将该向量与所传入的标量s进行相乘。
        n1.multiplyScalar(1);
        // 将传入的向量v和这个向量相加。
        n1.add(intersects[0].point);
        var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
        geometry.vertices.push(n1);
        geometry.computeBoundingSphere();
        geometry.verticesNeedUpdate = true;
        //生成点模型
        var points = new THREE.Points(geometry, pointMaterial);
        //将模型添加到场景
        scene.add(points);
        isDbciick = false;
      }
    } else {
      intersection.intersects = false;
    }
  };

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

  const addObj = () => {
    loader.load('/static/obj/brain.obj', (loadedMesh: any) => {
      // 创建材质及配置
      let material = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide,
        vertexColors: THREE.FaceColors,
      });
      console.log(loadedMesh);
      let object = loadedMesh.children[0];
      mesh = object;
      // 创建一个Geometry对象,并将obj模型转化为Geometry对象
      object.geometry = new THREE.Geometry().fromBufferGeometry(
        object.geometry,
      );
      // 通过 hashmap 检查重复的顶点,去掉重复顶点更新面得信息
      object.geometry.mergeVertices();
      // 每个面的法向量对顶点法向量的影响按照面的面积大小来计算
      object.geometry.computeVertexNormals();
      //  如果颜色队列或 face3 的颜色数据被修改，该值需要被设置为 true。
      object.geometry.colorsNeedUpdate = true;
      object.material.needsUpdate = true;
      // 将重新修改的材质和模型数据添加到网格
      let brainMesh = new THREE.Mesh(object.geometry, material);
      //  命名
      brainMesh.name = 'brain';
      brainMesh.needsUpdate = true;
      scene.add(brainMesh);
    });
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

export default AddObj;
