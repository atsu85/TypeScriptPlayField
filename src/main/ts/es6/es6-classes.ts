module THREE {
    export class Mesh {
        idMatrix: any;
        bones: any;
        boneMatrices: any;
        constructor(private geometry, private materials) {

        }

        update() {
            console.log("update()")
        }

    }
    
    export class Matrix4 {
        constructor() {

        }
    }

}

class SkinnedMesh extends THREE.Mesh {
    constructor(geometry, materials) {
        super(geometry, materials);

        this.idMatrix = SkinnedMesh.defaultMatrix();
        this.bones = [];
        this.boneMatrices = [];
        //...
    }
    update(camera?) {
        //...
        super.update();
    }
    get boneCount() {
        return this.bones.length;
    }
    set matrixType(matrixType) {
        this.idMatrix = SkinnedMesh[matrixType]();
    }
    static defaultMatrix() {
        return new THREE.Matrix4();
    }
}