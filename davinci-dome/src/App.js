import './App.css';
import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {useEffect, useRef} from "react";


function Box(props) {
    return (
        <mesh {...props}>

            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>

    )
}


function App() {

    return (
        <div className="App">
            <Canvas>
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>
                <Box position={[-1.2, 0, 1]}/>
                <Box position={[1.2, 0, 0]}/>
                <PerspectiveCamera makeDefault={true} position={[1.2, 1, 2]}/>
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default App;
