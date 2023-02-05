import Head from 'next/head';

import * as THREE from 'three';
import * as THREEx from 'node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only';
import { useEffect, useRef, useState } from 'react';

export default function Test() {
    const ref = useRef<HTMLCanvasElement>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!ref.current) return;
        const canvas = ref.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(80, 2, 0.1, 50000);
        const renderer = new THREE.WebGLRenderer({
            canvas,
        });

        const geom = new THREE.BoxGeometry(20, 20, 20);

        const arjs = new THREEx.LocationBased(scene, camera);

        // You can change the minimum GPS accuracy needed to register a position - by default 1000m
        //const arjs = new THREEx.LocationBased(scene, camera. { gpsMinAccuracy: 30 } );
        const cam = new THREEx.WebcamRenderer(renderer, '#video1');

        const mouseStep = THREE.MathUtils.degToRad(5);

        let orientationControls;

        // Orientation controls only work on mobile device
        if (isMobile()) {
            orientationControls = new THREEx.DeviceOrientationControls(camera);
        }

        let fake: { lat: number; lon: number } | null = null;
        let first = true;

        arjs.on('gpsupdate', (pos: any) => {
            if (first) {
                setupObjects(pos.coords.longitude, pos.coords.latitude);
                first = false;
            }
        });

        arjs.on('gpserror', (code: any) => {
            alert(`GPS error: code ${code}`);
        });

        // Uncomment to use a fake GPS location
        fake = { lat: 51.05, lon: -0.72 };
        if (fake) {
            arjs.fakeGps(fake.lon, fake.lat);
        } else {
            arjs.startGps();
        }

        let mousedown = false,
            lastX = 0;

        // Mouse events for testing on desktop machine
        if (!isMobile()) {
            window.addEventListener('mousedown', (e) => {
                mousedown = true;
            });

            window.addEventListener('mouseup', (e) => {
                mousedown = false;
            });

            window.addEventListener('mousemove', (e) => {
                if (!mousedown) return;
                if (e.clientX < lastX) {
                    camera.rotation.y += mouseStep;
                    if (camera.rotation.y < 0) {
                        camera.rotation.y += 2 * Math.PI;
                    }
                } else if (e.clientX > lastX) {
                    camera.rotation.y -= mouseStep;
                    if (camera.rotation.y > 2 * Math.PI) {
                        camera.rotation.y -= 2 * Math.PI;
                    }
                }
                lastX = e.clientX;
            });
        }

        function isMobile() {
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                // true for mobile device
                return true;
            }
            return false;
        }

        function render(time) {
            resizeUpdate();
            //if(orientationControls) orientationControls.update();
            cam.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        function resizeUpdate() {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth,
                height = canvas.clientHeight;
            if (width != canvas.width || height != canvas.height) {
                renderer.setSize(width, height, false);
            }
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        function setupObjects(longitude, latitude) {
            // Use position of first GPS update (fake or real)
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            arjs.add(
                new THREE.Mesh(geom, material),
                longitude,
                latitude + 0.001
            ); // slightly north
            arjs.add(
                new THREE.Mesh(geom, material2),
                longitude,
                latitude - 0.001
            ); // slightly south
            arjs.add(
                new THREE.Mesh(geom, material3),
                longitude - 0.001,
                latitude
            ); // slightly west
            arjs.add(
                new THREE.Mesh(geom, material4),
                longitude + 0.001,
                latitude
            ); // slightly east
        }

        requestAnimationFrame(render);
    }, [ref]);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <video
                id="video1"
                autoPlay
                playsInline
                style={{
                    display: 'none',
                }}
            ></video>
            <canvas
                ref={ref}
                style={{
                    width: '100vw',
                    height: '100vh',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    fontSize: '2rem',
                }}
            >
                {data && JSON.stringify(data)}
            </div>
        </>
    );
}
