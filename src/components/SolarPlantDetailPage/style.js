import styled from "styled-components";

export const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const SolarPlantDetailContainer = styled.div`
    background: #f3f4f6;
    overflow-y: auto;
    padding: 20px 35px;
`;

export const Header = styled.div`
    display: grid;
    grid-template-columns: 7fr 3fr;
    margin-bottom: 15px;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
`;

export const TitleIconContainer = styled.div`
    font-size: 50px;
    margin-right: 20px;
`;

export const Greeting = styled.div``;

export const TitleContent = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const TitleDescription = styled.p`
    font-size: 14px;
    font-weight: 700;
    color:#a5aaad ;
`;

export const InfoHome = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr;
    align-items: center;
    height: auto;
    padding: 15px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const InfoHomeIconContainer = styled.div`
    font-size: 30px;
    margin-right: 15px;
    color: #2e4a66;
    @media only screen and (min-width: 1920px){
        font-size: 40px;
    }
`;

export const InfoHomeCard = styled.div`
    display: inline-block;
    align-items: center;
    justify-content: space-between;
`;

export const InfoHomeTitle = styled.h1`
    font-size: 18px;
    color: #2e4a66;
    @media only screen and (min-width: 1920px){
        font-size: 25px;
    }
`;

export const InfoHomeDetail = styled.p`
    font-size: 12px;
    color: #2e4a66;
    font-weight: 700;
`;

export const MainCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin: 20px 0;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 70px;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const BoltIconContainer = styled.div`
    justify-content: center;
    margin-bottom: 5px;
    color: #0f8;
    font-size: 30px;
    margin-right: 30px;
`;

export const CardInner = styled.div`
    display: inline;
    text-align: center;
`;

export const CardInnertitle = styled.h1``;

export const CardInnerContentContainer = styled.div`
    flex-direction: column;
`;

export const CardInnerContent = styled.span`
    font-size: 18px;
    margin-right: 5px;
`;

export const ChartsCards = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 50px;

    @media only screen and (max-width: 978px) {
        grid-template-columns: 1fr;
    }

    @media only screen and (min-width: 1920px){
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const Chart = styled.div`
    padding: 25px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    max-height: 500px;
    min-height: 500px;
    overflow-y: scroll;
`;

export const ChartTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ChartTitleContainer = styled.div``;

export const ChartTitleContent = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const ChartLeftIconContainer = styled.div`
    color: #fff;
    font-size: 20px;
    background: #ffc100;
    border-radius: 200px 0px 200px 200px;
    -moz-border-radius: 200px 0px 200px 200px;
    -webkit-border-radius: 200px 0px 200px 200px;
    border: 0px solid #000;
    padding: 15px;
`;

export const ChartRightIconContainer = styled.div`
    color: #fff;
    font-size: 20px;
    background: #f00;
    border-radius: 200px 0px 200px 200px;
    -moz-border-radius: 200px 0px 200px 200px;
    -webkit-border-radius: 200px 0px 200px 200px;
    border: 0px solid #000;
    padding: 15px;
`;

export const Device = styled.div`
    padding: 15px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    margin-top: 20px;
    @media only screen and (min-width: 1920px){
        padding: 10px 0px;
    }
`;

export const DeviceCards = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    margin: 10px;
`;

export const DeviceCardContainer = styled.div``;

export const DeviceCardContent = styled.h4`
    font-size: 10px;
    font-weight: 700;
    margin-top: 5px;

    @media only screen and (min-width: 1920px){
        font-size: 12px;
    }
`;

export const DeviceCardIconContainer = styled.div`
    font-size: 80px;
    color: #35a4ba;
    text-align: center;
`;

export const InfoDeviceIconContainer = styled.div`
    font-size: 12px;
    color: #00ff00;
    display: inline;
    margin: 2px;
    cursor: pointer;
`;

export const StyledThead = styled.thead`
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
`;

export const TableError = styled.table`
    width: 100%;
    font-size: 12px;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #dedede;
    display: table;
    box-sizing: border-box;
    text-indent: initial;
`;

export const TableHeaderContainer = styled.tr`
    height: 48px;
    color: #444444;
    font-weight: bold;
    background: #f2f2f2;
    font-size: 13px;
    border: 1px solid #dedede;
    display: table-row;
    vertical-align: inherit;
`;

export const TableHeaderContent = styled.td`
    display: table-cell;
    vertical-align: inherit;
    border: 1px solid #000;
    padding: 2px 10px;
`;

export const TableBodyContainer = styled.tr`
    height: 48px;
    color: #444444;
    background: #fff;
    font-size: 11px;
    border: 1px solid #dedede;
    display: table-row;
    vertical-align: inherit;
`;

export const TableBodyContent = styled.td`
    display: table-cell;
    vertical-align: inherit;
    border-bottom: 1px solid #000;
    padding: 2px 10px;
`;

export const SelectedChartContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr ;
`;

export const ChartSelectedDateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ChartTypeSelectedContainer = styled.div``;

export const ChartTypeButton = styled.button`
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left: 2px;
    border-radius: 5px;
    cursor: pointer;

    :hover{
        background-color: #4cafff;
    }
`;

export const SelectedErrorContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr ;
`;

export const SelectedErrorDateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
`;

export const GenerateReportIconContainer = styled.div`
    font-size: 30px;
    color: #00ff00;
    text-align: center;
    cursor: pointer;
`;
