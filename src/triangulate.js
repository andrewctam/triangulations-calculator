var dp = [];

export const countDiagonals = (points) => {
    
    let vertices = [];

    //invert points since the origin is the top left for html, we want origin at bottom left
    for (let i = 0; i < points.length; i++) {
        vertices.push({
            x: points[i].x,
            y: window.innerHeight - points[i].y 
        })
    }

    //determine if points are counter clockwise
    let bottomMostIndex = 0;
    let leftMost = 0;

    for (let i = 1; i < vertices.length; i++) {
        if (vertices[i].y < vertices[bottomMostIndex].y)
            bottomMostIndex = i;
        if (vertices[i].x < vertices[leftMost].x)
            leftMost = i;
    }
    
    let current = vertices[bottomMostIndex];
    let bottomPrevIndex = (bottomMostIndex - 1 + vertices.length) % vertices.length;
    let prev = vertices[bottomPrevIndex];
    
    //if the points are not in counter clockwise order, reverse them
    if (prev.x > current.x)
        vertices.reverse();
  

    dp = new Array(vertices.length).fill(null).map(() => new Array(vertices.length).fill(0));
    
    //tabulate diagonals left of bottom most vertex
    return countToLeft(vertices, vertices.length - 1, 0, false);
}

const countToLeft = (vertices, start, end) => {
    if (dp[start][end] !== 0)
        return dp[start][end];

        debugger;
    let count = 0;

    let low = Math.min(start, end)
    let high = Math.max(start, end)
    
    for (let i = low; i != high; ) {
        if (left(vertices[start], vertices[end], vertices[i])) {
            let startFormsEdge = isEdge(vertices, start, i)
            let endFormsEdge = isEdge(vertices, end, i)
            
            let startFormsDiagonal = diagonal(vertices, start, i)
            let endFormsDiagonal = diagonal(vertices, end, i)   

            if ((startFormsDiagonal && endFormsDiagonal) || 
                ((startFormsDiagonal || endFormsDiagonal) && (startFormsEdge ^ endFormsEdge))) {

                count += countToLeft(vertices, start, i) * countToLeft(vertices, i, end);
            }
        }


        if (i == vertices.length - 1)
            i = 0;
        else
            i++;    
    }    

    if (count == 0)
        count = 1; //base case


    dp[start][end] = count;
    console.log(dp)
    return count;
       
}

const isEdge = (vertices, i, j) => {
    return Math.abs(i - j) == 1 || Math.abs(i - j) == vertices.length - 1;
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

        if (c.x != a.x && c.y != a.y &&
            c.x != b.x && c.y != b.y &&
            c1.x != a.x && c1.y != a.y &&
            c1.x != b.x && c1.y != b.y &&
            intersect(a, b, c, c1)) {
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
