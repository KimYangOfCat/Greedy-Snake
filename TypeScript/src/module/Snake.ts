//定义一个蛇的类
class Snake{
    //获取蛇的容器
    snake:HTMLElement;
    //表示蛇头的元素
    head:HTMLElement;
    //表示蛇身（包括蛇头）
    bodies:HTMLCollection;
    constructor(){
        this.snake=document.getElementById('snake')!;
        this.head=document.querySelector('#snake>div') as HTMLElement;
        this.bodies=this.snake.getElementsByTagName('div');
    }
    //获取蛇头的坐标
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇头坐标
    set X(val:number){
        //如果新值和旧值相同就直接返回不再修改
        if(this.X===val){
            return;
        }
        if(val<0||val>290){
            throw new Error('撞墙了！')
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
            // console.log('水平方向发生了掉头');
            // 如果发生了掉头，让蛇向反方向继续移动
            if (val > this.X) {
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                val = this.X - 10;
            } else {
                // 向左走
                val = this.X + 10;
            }
        }

        //移动身体
        this.moveBody()
        this.head.style.left=val+'px';
        //检查有没有撞到自己
        this.checkHeadBody() //这里不用单独捕获错误，可以留到 set 方法外边统一处理
    }
    set Y(val:number){

        if(this.Y===val){
            return;
        }
        if(val<0||val>290){
            throw new Error('撞墙了！')
        }
        // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
            if (val > this.Y) {
                val = this.Y - 10;
            } else {
                val = this.Y + 10;
            }
        }

        //移动身体
        this.moveBody()
        this.head.style.top=val+'px';
        //检查有没有撞到自己
        this.checkHeadBody() //这里不用单独捕获错误，可以留到 set 方法外边统一处理
    }

    //蛇增加身体的方法
    addBody(){
        this.snake.insertAdjacentHTML("beforeend","<div></div>");
    }

    //添加一个蛇身体移动的方法
    moveBody(){
        //将后边身体的位置设置为前边身体的位置，从后往前遍历，就像毛毛虫的移动一样
        //遍历获取所有的身体
        for(let i=this.bodies.length-1;i>0;i--){
            //获取前面身体的位置
            let X=(this.bodies[i-1]as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1]as HTMLElement).offsetTop;

            //将值设置到当前身体上
            (this.bodies[i]as HTMLElement).style.left= X+'px';
            (this.bodies[i]as HTMLElement).style.top= Y+'px';

        }
    }
    //检查所有身体，检查其是否于蛇头的坐标发生重叠
    checkHeadBody(){
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd=this.bodies[i]as HTMLElement;
            if(this.X===bd.offsetLeft&&this.Y===bd.offsetTop){
                //说明蛇头撞到了身体
                throw new Error("蛇头撞到了身体")
            }
        }
    }
}
export default Snake;