import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader";


const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    // control the floating behavior of the elements
    //sets the speed of the floating animation
    //controls the intensity of the rotation animation of the elements
    // determines the intensity of the floating animation itself
    <Float speed={2.75} rotationIntensity={1} floatIntensity={2}>
      {/*  type of light source and set the intensity of the ambient light  */}
      <ambientLight intensity={1.05} />
      {/* the directionalLight is an another type of light source that emits lights in a speficic direction */}
      <directionalLight position={[0, 0, 0.05]} />
      {/* mesh represent the 3D objects in the scene and the scale makes it 2.75 times larger */}
      <mesh castShadow receiveShadow scale={2.75}>
        {/* defines the geometry  and the args is the aarguments that represents the radius and the detail level */}
        <icosahedronGeometry args={[1, 1]} />
        {/* defines the properties of the 3D objects */}
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* the decal is used to add the image to the 3D objects */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
    //  frameloop mode to 'demand,' which means that rendering updates will only occur when requested, likely to optimize performance
      frameloop='demand'
      // the device pixel ratio (DPR) which indicates that the canvas should render at two different DPRs
      dpr={[1, 2]}
      // provides options for the WebGL rendering 
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* the suspense is used for handling the asynchronous loading */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
        {/* preload is usedd to pre-load the assests asynchronously */}
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;