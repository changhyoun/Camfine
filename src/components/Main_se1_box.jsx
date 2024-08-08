import './Main_se1_box.css';

function Main_se1_box({Main_se1_box_ic, Main_se1_box_tx}){

    return(
        <div className="Main_se1_box">
            <img src={Main_se1_box_ic} alt="Main_se1_box_icon" />
            <p>{Main_se1_box_tx}</p>
        </div>
    )
}

export default Main_se1_box;