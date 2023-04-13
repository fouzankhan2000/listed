import axios from "axios";
import ReactApexChart from 'react-apexcharts';
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import { FiPieChart } from 'react-icons/fi';
import { BsTags } from 'react-icons/bs';
import { MdKeyboardArrowRight, MdOutlineScheduleSend } from 'react-icons/md';
import { GoSearch } from "react-icons/go";
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';
import { BiBell } from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import "../CssFiles/Dashboard.css";
import { useState, useEffect } from "react";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
)

const Dashboard = () => {

  const [search, setSearch] = useState('')
  const [information, setInformation] = useState([]);
  const [buttonClicked, setButtonClicked] = useState([]);
  const [graphdata, setGraphdata] = useState({});
  const [pie, setPie] = useState({});
  const [click, setClick] = useState(false);


  const myStyle = {
    display: buttonClicked ? "block" : "none",
  };

  useEffect(() => {
    axios.get(`https://api.coincap.io/v2/assets/${search}`)
      .then(response => response.data.data)
      .then(data => setInformation(data))
      .catch(error => console.error(error));
  }, []);

  const info = JSON.stringify(information)
  const df = JSON.parse(info)
  console.log(df);

  const handleClick = () => {
    setClick(true)
    // Number(data[0]["supply"])
    setButtonClicked(df);
    
    const data1 = {
      labels: ["Week 1", "Week2", "Week3", "Week 4"],
      datasets: [{
        label: 'Guest',
        data: [df[0]["supply"], df[1]["supply"], df[2]["supply"], df[3]["maxSupply"]],
        backgroundcolor: "transparent",
        borderColor: "#9BDD7C",
        tension: 0.5,
      },
      {
        label: 'User',
        data: [df[4]["supply"], df[6]["maxSupply"], df[7]["supply"], df[5]["maxSupply"]],
        backgroundcolor: "transparent",
        borderColor: "#E9A0A0",
        tension: 0.5,
      }]

    }
    setGraphdata(data1);

    const Piedata = {
      series: [Number(df[0]["supply"]),Number(df[0]["maxSupply"]),Number(df[1]["supply"])],
      options: {
        colors: ['#EE8484', '#F6DC7D', '#98D89E'],
        chart: {
          type: 'pie'
        },
        labels: ['Basic Tees', 'Custom Short Pants', 'Super Hoodies'],
        legend: {
          position: 'right'
        }
      }
    };
    // data: [df[0]["supply"],df[0]["maxSupply"],df[1]["supply"]],
   
    setPie(Piedata)

  };

  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: true,
        position: 'right',
        align: 'center',
    }
}



  return (
    <div className='Container'>
      <div className="left">
        <h1>Board.</h1>
        <h3><FiPieChart />  <span>Dashboard</span></h3>
        <h4><BsTags />  <span>Transactions</span></h4>
        <h4><MdOutlineScheduleSend />  <span>Schedules</span></h4>
        <h4><FaRegUserCircle />  <span>Users</span></h4>
        <h4><MdOutlineSettings />  <span>Settings</span></h4>

        <div className='left-footer'>
          <h4>Help</h4>
          <h4>Contact Us</h4>
        </div>

      </div>

      <div className='right'>
        <div className='right-head'>
          <h1>Dashboard</h1>
          <div className="right-head2">
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <button onClick={handleClick}><GoSearch /></button>
            <BiBell />
            <img src="../favicon.ico" />
          </div>
        </div>

        <div className='right-top'>
          <div class="box">

            <div className="icon"><FaRegMoneyBillAlt /></div>
            <div className="text">
              <p>Total Revenues</p>
              {click ? <h3 className="data">$ {Number(buttonClicked[0]["supply"])}</h3> :
                <p></p>}
            </div>

          </div>
          <div class="box">
            <div className="icon"><BsTags /></div>
            <div className="text">
              <p>Total Transactions</p>
              {click ? <h3 className="data">{Number(buttonClicked[0]["vwap24Hr"]).toFixed(0)}</h3> :
                <p></p>}
            </div>
          </div>
          <div class="box">
            <div className="icon"><AiOutlineLike /></div>
            <div className="text">
              <p>Total Likes</p>
              {click ? <h3 className="data">{Number(buttonClicked[0]["rank"])}</h3> :
                <p></p>}
            </div>
          </div>
          <div class="box">
            <div className="icon"><FiUsers /></div>
            <div className="text">
              <p>Total Users</p>
              {click ? <h3 className="data">{Number(buttonClicked[0]["maxSupply"])}</h3> :
                <p></p>}
            </div>
          </div>
        </div>

        <div className="right-middle">
          <div className="line">
            {click && <Line options={options} data={graphdata}></Line>}
          </div>
        </div>

        <div className="right-bottom">
          <div className="top-products details">
            <div className="top-products1">
              <h3>Top products</h3>

              <select>
                <option>May - June 2021</option>
                <option>June - July 2021</option>
                <option>July - August 2021</option>
              </select>
            </div>

            <div className="pie-chart">
            {click && <ReactApexChart className='pichart1' options={pie.options} series={pie.series} type="pie" height={350}/> } 
            </div>
          </div>

          <div className="today-schedule details">
            <div className="today-schedule1">
              <h3>Today's schedule</h3>
              <p>See All <MdKeyboardArrowRight /></p>
            </div>

            <div className="today-schedule2">
              <div className="item-1">
                <div className="line-1"></div>
                <div>
                  <p>Meeting with suppliers from Kuta Bali</p>
                  <p className="span">14.00-15.00</p>
                  <p className="span">at Sunset Road, Kuta, Bali</p>
                </div>
              </div>

              <div className="item-2">
                <div className="line-2"></div>
                <div>
                  <p>Check operation at Giga Factory 1</p>
                  <p className="span">18.00-20.00</p>
                  <p className="span">at Central Jakarta</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Dashboard