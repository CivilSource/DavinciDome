import './App.css';
import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Vector3} from 'three';

interface Somewhere {
    position: Vector3;
}

function Box({position}: Somewhere) {
    return (
        <mesh position={position}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    );
}

function Ball({position}: Somewhere) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.25, 32, 16]}/>
            <meshPhongMaterial color="blue"/>
        </mesh>
    );
}

function App() {
    const balls = [];
    const radius = 10;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 15) {
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        balls.push([x, z]);
    }
    return (
        <div className="App">
            <Canvas className="Canvas">
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>
                <Box position={new Vector3(0, 0, 0)}/>
                {balls.map(xz => {
                    return <Ball position={new Vector3(xz[0], 0, xz[1])}/>;
                })}
                <PerspectiveCamera makeDefault={true} position={[1.2, 1, 2]}/>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}

export default App;
