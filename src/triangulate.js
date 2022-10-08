export const countDiagonals = (points) => {
    const vertices = [];

    for (let i = 0; i < points.length; i++) {
        vertices.push({
            x: points[i].x,
            y: -points[i].y //invert points since the origin is the top left for JS, we want origin at bottom left
        })
    }

    let count = 0;
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            if (diagonal(vertices, i, j)) {
                count++;
                console.log(i + " " + j)
            }
        }
    }
    return count;
    
}


const area2 = (a, b, c) => {
    return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y) ;
}
const left = (a, b, c) => {
    return area2(a, b, c) > 0;
}
const leftOn = (a, b, c) => {
    return area2(a, b, c) >= 0;
}
const collinear = (a, b, c) => {
    return area2(a, b, c) === 0;
}

const intersectProp = (a, b, c, d) => {
    if (collinear(a, b, c) || collinear(a, b, d) || collinear(c, d, a) || collinear(c, d, b)) {
        return false;
    }

    return (left(a, b, c) ^ left(a, b, d)) && (left(c, d, a) ^ left(c, d, b));
}
const between = (a, b, c) => {
    
    if (!collinear(a, b, c)) {
        return false;
    }
    
    if (a.x != b.x) {
        return ((a.x <= c.x && c.x <= b.x) || (a.x >= c.x && c.x >= b.x));
    } else {
        return ((a.y <= c.y && c.y <= b.y) || (a.y >= c.y && c.y >= b.y));
    }
}
const intersect = (a, b, c, d) => {

    if (intersectProp(a, b, c, d)) {
        return true;
    } 
    return between(a, b, c) || between(a, b, d) || between(c, d, a) || between (c, d, b);
}


const isDiagonalie = (vertices, a, b) => {
    //using an array instead of a linked list like structure on the slides, so we need a ptr
    let ptr = 0;
    do {
        let c = vertices[ptr % vertices.length];
        let c1 = vertices[(ptr + 1) % vertices.length];

        if (c.x != a.x && c.x != b.x && c1.x != a.x && c1.x != b.x && intersect(a, b, c, c1)) {
            return false;
        }

        ptr++;

    } while (ptr % vertices.length != 0)

    return true;
}

const inCone = (vertices, i, j) => {
    let a = vertices[i];
    let b = vertices[j];

    let a1 = vertices[(i + 1) % vertices.length];
    let a0 = vertices[(i - 1 + vertices.length) % vertices.length];


    if (leftOn(a, a1, a0)) {
        return left(a, b, a0) && left(b, a, a1);
    } else
        return !(leftOn(a, b, a1) && leftOn(b, a, a0));
}
    

const diagonal = (vertices, i, j) => {
    return isDiagonalie(vertices, vertices[i], vertices[j]) && inCone(vertices, i, j) && inCone(vertices, j, i);
}
