import './index.css'
import './index.less'
import './index.scss'
import React,{Component} from 'react'

// import a from '../../assets/images/bbb.gif'//组件中，引入图片一定要import变量，将变量作为src值
import a from 'assets/images/bbb.gif'//注意这样也可以，不用加～
class App extends Component{
    render() {

        return (
            <div>
                <img src={a} alt=""/>
                <div className="a"></div>
                <div className="b"></div>
            </div>

        )

    }
}


export default App;