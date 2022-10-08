export const countDiagonals = (points) => {
    const dp = new Array(points.length).fill().map(() => new Array(points.length).fill());

    let count = 0;  
    for (let i = 0; i < points.length; i++) {
        
    }



    return count;
    
}

const helper = (points, dp, i, j) => {

}

const area2 = (a, b, c) => {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
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


const isDiagonalie = (points, a, b) => {
    //using an array instead of a linked list like structure on the slides, so we need a ptr
    let ptr = 0;
    do {
        let c = points[ptr];
        let c1 = points[ptr + 1];

        if (c != a && c1 != a && c != b && c1 != b && intersect(a,b,c,c1))
            return false;
        
        ptr++;

    } while (c != points[0])

    return true
}

const inCone = (points, i, j) => {
    let a = points[i];
    let b = points[j];

    let a1 = points[i + 1];
    let a0 = points[i - 1];


    if (leftOn(a, a1, a0))
        return left(a, b, a0) && left(b, a, a1);
    else
        return !(leftOn(a, b, a1) && leftOn(b, a, a0));
}
    

const diagonal = (points, i, j) => {
    return isDiagonalie(points, points[i], points[j]) && inCone(points, i, j) && inCone(points, j, i);
}
