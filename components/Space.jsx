import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Space = () => {

    useEffect(() => {

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('bg'),
        })

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.position.setZ(30)

        renderer.render(scene, camera)

        const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
        // const material = new THREE.MeshBasicMaterial({ color: 0xFF8423, wireframe: true })

        const material = new THREE.MeshStandardMaterial({ color: 0x93549e })

        const torus = new THREE.Mesh(geometry, material)

        scene.add(torus)

        const pointLight = new THREE.PointLight(0xffffff)
        pointLight.position.set(15, 10, 0)

        const ambientLight = new THREE.AmbientLight(0xffffff)

        scene.add(ambientLight, pointLight)

        const lightHelper = new THREE.PointLightHelper(pointLight)
        const gridHelper = new THREE.GridHelper(200, 50)
        scene.add(lightHelper, gridHelper)

        const controls = new OrbitControls(camera, renderer.domElement)

        function addStar() {
            const geometry = new THREE.SphereGeometry(0.1, 24, 24)
            const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
            const star = new THREE.Mesh(geometry, material)

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))


            star.position.set(x, y, z)
            scene.add(star)
        }

        Array(2000).fill().forEach(addStar)


        const spaceTexture = new THREE.TextureLoader().load('spacetexture.png')

        scene.background = spaceTexture

        const moonSurface = new THREE.TextureLoader().load('moonmap.png')
        const moonTexture = new THREE.TextureLoader().load('moontexture.png')
        // const moonDisp = new THREE.TextureLoader().load('moondisp.png')

        const moon = new THREE.Mesh(
            new THREE.SphereGeometry(5, 32, 32),
            new THREE.MeshStandardMaterial(
                {
                    map: moonSurface,
                    normalMap: moonTexture,
                    // displacementMap: moonDisp

                }
            )
        )

        scene.add(moon)


        function animate() {

            requestAnimationFrame(animate);

            torus.rotation.x += 0.01
            torus.rotation.y += 0.005
            torus.rotation.z -= 0.02

            controls.update()
            renderer.render(scene, camera)

        }

        animate()

    })

    return (
        <canvas  id="bg"/>
       
        
    )
}

export default Space
