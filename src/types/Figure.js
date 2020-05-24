import React from 'react';
import { Icon } from 'semantic-ui-react';

export class Figure {
    constructor(name, count, num) {
        this.name = name;
        this.count = count;
        this.num = num;
        this.col = 0;
        this.row = 0;
    }

    display() {
        if(this.num === -1) { //zaszlo
            return (<Icon name='flag' />);
        } 
        if(this.num === 0) { //bomba
            return (<Icon name='bomb' />);
        }
        return (<span>{this.num}</span>);
    }
}