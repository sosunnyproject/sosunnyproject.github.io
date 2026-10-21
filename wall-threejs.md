Role: Act as an expert Three.js developer.

Task: Generate a complete Three.js scene containing a 3D isometric indoor climbing wall. Do not load any external 3D models (no .obj or .gltf). You must generate the geometry entirely through Three.js code.

Technical Requirements & Visual Style:

1. The Wall Geometry (Low-Poly Faceted Look):

Start with a THREE.PlaneGeometry. Give it enough segments to create a grid of triangles (e.g., new THREE.PlaneGeometry(10, 15, 6, 8)).

Crucial Step: Access the position attribute of the geometry and iterate through the vertices. Apply a random offset to the Z-axis (depth) of each vertex within a constrained range (e.g., -0.5 to 0.5). This will create the uneven, jagged 3D surface.

After displacing the vertices, ensure you call geometry.computeVertexNormals() so the light bounces off the new angles correctly.

2. The Wall Material:

Use a THREE.MeshStandardMaterial or THREE.MeshLambertMaterial.

Crucial Step: Set flatShading: true. This forces Three.js to render each triangle face individually rather than smoothing them out, giving it the required faceted, low-poly aesthetic.

Make the wall color a light grey or off-white.

3. The Climbing Holds (Grips):

Create a function to generate climbing holds. Use small, low-poly geometries like THREE.DodecahedronGeometry(0.15) or highly decimated THREE.SphereGeometry.

Assign them bright, distinct materials (red, blue, green, yellow, pink).

Distribute them across the surface of the wall. To ensure they sit correctly on the jagged surface, use the modified vertex coordinates from the wall's geometry to position the holds, adding a slight offset to the Z-axis so they poke out.

4. Camera and Layout (Isometric View):

Use a THREE.OrthographicCamera to achieve a true isometric perspective, or use a THREE.PerspectiveCamera positioned at an angle (e.g., x: 15, y: 15, z: 15) looking directly at the center of the wall (scene.position).

Rotate the wall slightly if necessary so the 3D facets and depth are clearly visible to the camera.

5. Lighting:

Add an AmbientLight for base visibility.

Add a strong DirectionalLight positioned to cast shadows across the triangular faces. The contrast between highlighted faces and shadowed faces is what makes the flatShading look good.

Why this specific approach works:
PlaneGeometry + Vertex Displacing: It is much easier to start with a flat grid of triangles and push the points in and out (Z-depth) than it is to mathematically draw a complex 3D shape from scratch.

flatShading: true: This is the magic ingredient. By default, Three.js tries to blend lighting across geometry to make spheres look perfectly round. Turning this on breaks that blending, giving you those crisp, distinct triangular planes seen in your reference images.

Vertex Snapping for Holds: By anchoring the small, colorful climbing holds to the actual x, y, z coordinates of the wall's displaced vertices, the agent avoids the math nightmare of trying to calculate face normals to attach them to the exact center of tilted triangles.