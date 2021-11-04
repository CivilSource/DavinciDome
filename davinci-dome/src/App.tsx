import './App.css';
import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Vector3} from 'three';
import {Scaffold} from './Scaffold';

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
    const scaffold = new Scaffold(6, 7);
    scaffold.vertices.forEach(({location, adjacent}) => {
        for (let walk = 0; walk < adjacent.length; walk++) {
            const a = adjacent[walk];
            const b = adjacent[(walk + 1) % adjacent.length];
            const toA = new Vector3().subVectors(a.location, location).normalize();
            const toB = new Vector3().subVectors(b.location, location).normalize();
            const dot = toA.dot(toB);
            const degrees = Math.acos(dot) * 180 / Math.PI;
            if (degrees < 53 || degrees > 75) {
                throw new Error("Angle out of range: " + degrees);
            }
        }
    });
    return (
        <div className="App">
            <Canvas className="Canvas">
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>
                <Box position={new Vector3(0, 0, 0)}/>
                {scaffold.vertices.map(({index, location}) => {
                    return <Ball key={`vertex-${index}`} position={location}/>;
                })}
                <PerspectiveCamera makeDefault={true} position={[20, 1, 2]}/>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}

export default App;
