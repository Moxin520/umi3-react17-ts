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
    addObj();
    cameraStting(0, 350, 0);
    let controls = new OrbitControls(camera, renderer.domElement);
    renderScene();
  }, []);
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
    loader.load(
      'http://localhost:8000/static/obj/brain.obj',
      (loadedMesh: any) => {
        // 创建材质及配置
        let material = new THREE.MeshPhongMaterial({
          color: 0xcccccc,
          side: THREE.DoubleSide,
          vertexColors: THREE.FaceColors,
        });
        let object = loadedMesh.children[0];
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
      },
    );
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
