//引入其他类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel"

//游戏控制类，控制其他类
class GameControl{
    //定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;

    //创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction:string = '';
    //创建一个属性来记录游戏是否结束
    isLive=true;


    constructor(){
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel(10,10);
        
        this.init()
    }

    //游戏初始化方法，调用后游戏开始
    init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        //注意这里使用了bind绑定this，是为了改变回调函数执行时的this对象
        this.run();
    }

    //定义一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        // chrome 返回的 key 为 ArrowUp、ArrowDown、ArrowLeft、ArrowRight
    // IE 返回的 key 为 Up、Down、Left、Right
    //记得检查event的值是否合法
    this.direction=event.key;
    }

    //创建一个控制蛇移动的方法
    run(){
        /*
        *根据方向（this.direction）来使蛇的位置改变
            向上 top 减少
            向下 top 增加
            向左 left 减少
            向右 left 增加
        */
        //获取蛇现在的坐标
        let X=this.snake.X;
        let Y=this.snake.Y;
        //根据现在的方向修改当前的X Y，但尚未生效
        switch (this.direction){
            case "ArrowUp":
            case "Up":
                Y-=10;
                break;
            case "ArrowDown":
            case "Down":
                Y+=10;
                break;
            case "ArrowLeft":
            case "Left":
                X-=10;
                break;
            case "ArrowRight":
            case "Right":
                X+=10;
                break;
        }
        //检查蛇是否吃到了食物
        this.checkEat(X,Y)
        //修改蛇的位置
        try{
            this.snake.X=X;
            this.snake.Y=Y;
        }catch(e){
            //游戏出现异常，
            alert(e.message);
            this.isLive=false;
        }

        //开启一个定时调用
        this.isLive&&setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);
    }

    //定义一个方法，用来检查蛇是否吃到了食物
    checkEat(X:number,Y:number){
        if( X===this.food.X&&Y===this.food.Y){
            //食物的位置要进行重置
            this.food.change();
            //分数增加
            this.scorePanel.addScore();
            //蛇要增加一节
            this.snake.addBody();
        }
    }

}
export default GameControl;