# Smoothing creases
The original blender x3d export does not render well in x3dom with a creaseAngle > 0 because there are 90 degree corners with single triangles on each side. The normals are interpolated at the edge, and then cause unexpected shading.

The solution is to physically separate the polygons along these sharp edges. Then normals will not be interpolated across them. This can be done by splitting the vertices in blender.

# Edge splitting in Blender

The procedure in Blender is to first select the edges in Modelling. Select all faces on top of the page, then use Select - Select Loops - Select Boundary Loops to select only the boundary edges. These selected edges now need to be marked sharp, in Edge - Mark Sharp.

The vertex splitting can only be done by a Modifier. In the Modifier Properties tab, add the Edge Split modifier. Turn off the angle option and turn on the Sharp Edges option. The modifier will split the edges on the fly. There is also another modifier, the MeshSequenceCache which uses an alembic file to supply vertices during animation. It will overwrite the edge splitting. Therefore it is necessary to remove the MeshSequenceCache. The animation split vertices have to be generated outside of blender.

In Geometry Nodes, a table lists all vertices. Comparing the number of all vertices (rows) between evaluated (with modifier) and original provides confirmation that the edge splitting is working.

For x3d export it is necessary to make the edge slitting permanent. In the Modifier Properties tab, use the little down arrow next to the Edge Split modifier to select the Apply (Ctrl A) option. This makes the changes permanent and removes the modifier.

Finally, export as X3D. The IFS will have Coordinate points and the coordIndex with the now separated polygons.

# Transferring the split vertices to the Interpolator for animation

The split vertices need to be transferred from the IFS to the CoordinateInterpolator. For this, the indices of the split vertices need to be identified, so that the new vertices can be added to the unsplit coordinates in the interpolator, by duplicating positions.
Luckily, it turns out that the new, split vertices can be easily identified in the IFS. Blender just adds them to the end of vertices point field in the Coordinate node. Then, searching through all positions of the unsplit, original list of indices, gives the original index for any of the added vertices. This index can then be used to find the positions also for split vertices in the animation.
There is js which does all this in the .html files, for each object.
