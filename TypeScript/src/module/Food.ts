//定义 食物类 Food
class Food{
    //定义属性表示食物所对应的元素
    element:HTMLElement;
    constructor(){
        this.element=document.getElementById('food')!;//!表示强制取值
    }

    //定义一个获取食物X轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }

    //定一个获取食物Y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }

    //定义一个修改食物位置的方法；
    change(){
        //生成随机的位置
        //食物的横纵位置的最小是0，最大是290
        //蛇一次移动就是一格，一格的距离是 10，所以要求食物位置必须能整除10
        let top=Math.round(Math.random()*29)*10;
        let left=Math.round(Math.random()*29)*10
        this.element.style.left=left+'px'
        this.element.style.top=top+'px'
    }

}

//测试代码
// const food=new Food()
// food.change()

export default Food;
