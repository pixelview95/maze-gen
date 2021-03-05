function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];// top, right,bottom, left
    this.visited = false;

    this.checkNeighbors = function () {
        var neighbors = [];

        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited) { neighbors.push(top); }
        if (right && !right.visited) { neighbors.push(right); }
        if (bottom && !bottom.visited) { neighbors.push(bottom); }
        if (left && !left.visited) { neighbors.push(left); }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        }
        else { return undefined; }
    }//check neighbours

    this.highlight = function (state) {
        noStroke();
        var x = this.i * w;
        var y = this.j * w;
        if (state == true) {
            fill(0, 0, 255, 100);
            circle(x + w / 2, y + w / 2, w - 4, w - 4);
        }
        else {
            fill(255, 255, 255);
            circle(x + w / 2, y + w / 2, w - 3, w - 3);
        }
    }
    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;

        if (this.visited) {
            noStroke();
            fill(255, 255, 255);
            rect(x, y, w, w);
        }
        stroke('black');
        if (this.walls[0]) { line(x, y, x + w, y); }
        if (this.walls[1]) { line(x + w, y, x + w, y + w); }
        if (this.walls[2]) { line(x + w, y + w, x, y + w); }
        if (this.walls[3]) { line(x, y + w, x, y); }
        noFill();
        rect(0, 0, cols * w, rows * w);
    }//show 

}//Cell