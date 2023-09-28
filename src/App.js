import logo from './logo.svg';
import './App.css';
import { useLayoutEffect, useRef, useEffect, } from 'react';
import { OrbitControls, useGLTF, MotionPathControls, Cloud, Html, MeshPortalMaterial, CameraShake, Environment, useScroll } from '@react-three/drei'
import { Float } from '@react-three/drei';
// import Model from './Model';
import gsap from 'gsap';
import { useThree, useFrame } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import { ScrollControls } from '@react-three/drei';

function App() {

   //   const config = {
   //     maxYaw: 0.1, // Max amount camera can yaw in either direction
   //     maxPitch: 0.1, // Max amount camera can pitch in either direction
   //     maxRoll: 0.1, // Max amount camera can roll in either direction
   //     yawFrequency: 0.1, // Frequency of the the yaw rotation
   //     pitchFrequency: 0.1, // Frequency of the pitch rotation
   //     rollFrequency: 0.1, // Frequency of the roll rotation
   //     intensity: 1, // initial intensity of the shake
   //     decay: false, // should the intensity decay over time
   //     decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
   //     controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
   //   }

   const [move, setMove] = React.useState(0);
   const tl = gsap.timeline();
   const t2 = useRef();
   const scroll = useScroll();

   useFrame(() => {

      t2.current.seek(scroll.offset * t2.current.duration());

      // console.log(t2.current.duration);

      // console.log(scroll.offset);
   });
   // const scrolll = useScroll();
   // console.log(scrolll);
   // console.log(scroll);
   //   useFrame(()=>{
   //    tl.seek(scroll.offset*tl.duration());
   //   })

   const model = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf');
   // console.log(Model);
   const poi = useRef();
   const ref = useRef();
   const torus = useRef();
   const { camera } = useThree();
   const cordi = [
      { x: 1.923059371487195, y: -0.8772672632259472, z: 0.6546809728596932 },
      { x: -7.743968078276336, y: 1.2652655825469234, z: -0.5123072163994198 },
      { x: -9.765112527890989, y: 1.1999561968597932, z: 0.26404896533097405 },
      { x: -2.5155526795085644, y: 1.2476419447687192, z: -0.49390368649837525 },
      { x: 5.223735732997072, y: -1.5671306804528032, z: -0.2955755695404475 },
      { x: 4.357808937280654, y: 0.9495510727446826, z: -0.4433152763499936 },
      { x: -6.85037980362183, y: -1.4975299863772266, z: 0.6393197526405485 },
      { x: -4.295896078565516, y: 0.21291558676195306, z: 0.6393401925273185 },
      { x: -6.96377266672602, y: 0.10555493273843036, z: 0.4844513079979878 },
      { x: 9.569784421232015, y: -1.5406686250591272, z: -0.5200672208270521 }
   ]

   if (move) {
      let xcordi = cordi[move].x;
      let ycordi = cordi[move].y;
      let zcordi = cordi[move].z;
      tl.to(camera.position, {
         x: xcordi,
         y: ycordi,
         z: zcordi,
         ease: "easein",
         // scrollTrigger: {
         //    trigger: ".section2", // Replace with the appropriate trigger selector
         //    start: "top bottom",
         //    end: "top top",
         //    scrub: true,
         //    immediateRender: false,
         //    markers: true,
         //    onToggle: ({ isActive }) => {
         //       if (isActive) {
         //          console.log("ScrollTrigger is fired.");
         //       } else {
         //          console.log("ScrollTrigger is not active.");
         //       }
         //    },
         // },
      });
   }
   useLayoutEffect(() => {
      console.log("Use Layout is working for now ");
      t2.current = gsap.timeline();
      t2.current.to(
         ref.current.position, {
         duration: 2,
         y: +7,
      }, 0
      );
      t2.current.to(
         ref.current.rotation,
         { duration: 1, x: 0, y: Math.PI / 6, z: 0 },
         0
      );
      t2.current.to(
         ref.current.rotation,
         { duration: 1, x: 0, y: -Math.PI / 6, z: 0 },
         1
      );
      t2.current.to(
         poi.current.rotation,
         { duration: 1, x: +Math.PI / 2,  y: +Math.PI / 2, z: 0 },
         0
      );
      t2.current.to(
         torus.current.rotation,
         { duration: 1, x: +Math.PI / 2, y: +Math.PI / 2, z: 0 },
         0
      );
      // ScrollTrigger.refresh();
   }, [])
   // useEffect(() => {
   //    tl.to(camera.position, {
   //       x: 10,
   //       y: -2,
   //       z: 1,
   //       scrollTrigger: {
   //          trigger: ".section2", // Replace with the appropriate trigger selector
   //          start: "top bottom",
   //          end: "top top",
   //          scrub: true,
   //          immediateRender: false,
   //       },
   //    });
   // }, []);
   return (
      <>
         <OrbitControls enableZoom={false} />
         {/* <CameraShake {...config} /> */}
         <ambientLight />
         <Environment preset="dawn" background near={1} far={1000} resolution={256} />
         <group ref={ref} >
            <mesh scale={0.2} position={[0, -4, 0]} ref={torus} >

               <torusKnotGeometry args={[10, 3, 100, 20]} />
               <meshNormalMaterial />
            </mesh>
            <mesh position-y={-5} >
               <boxGeometry />
               <meshNormalMaterial />
               <Cloud opacity={0.5} position={[0, 0, -10]} speed={2} scale={10} />
               <Cloud opacity={1} position={[0, 10, -10]} speed={1} scale={20} />
            </mesh>
            {/* <MotionPathControls offset={0} focus={poi} damping={0.2}>
         <cubicBezierCurve3 v0={[-5, -5, 0]} v1={[-10, 0, 0]} v2={[0, 3, 0]} v3={[6, 3, 0]} />
         <cubicBezierCurve3 v0={[6, 3, 0]} v1={[10, 5, 5]} v2={[5, 5, 5]} v3={[5, 5, 5]} />
         </MotionPathControls> */}
            {/* <Model/> */}
            {/* <MeshPortalMaterial  > */}
            <Float floatIntensity={4} speed={10} >
               <primitive object={model.scene} position-y={1} ref={poi} onClick={() => { setMove(move + 1) }}  >
                  <Html wrapperClass='label' pointerEvents='stroke' position={[1, 1, 0]}

                     center

                     occlude={[poi]}
                  >
                     HuiHUi
                  </Html>

               </primitive>
            </Float>
         </group>

         {/* </MeshPortalMaterial> */}
      </>
   );
}

export default App;
