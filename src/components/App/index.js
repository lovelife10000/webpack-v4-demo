import './index.css'
import './index.less'
import './index.scss'
import React, {Component} from 'react'

// import a from '../../assets/images/bbb.gif'//组件中，引入图片一定要import变量，将变量作为src值
import a from 'assets/images/bbb.gif'//注意这样也可以，不用加～
class App extends Component {

    constructor(props) {
        super()
    }

    componentWillMount() {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        }
        else {
            // IE6, IE5 浏览器执行代码
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp);

            }
        }
        xmlhttp.open("POST", "/loginInfo", true);
        xmlhttp.send();
    }

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