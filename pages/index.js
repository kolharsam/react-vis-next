import fetch from "isomorphic-unfetch"
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
} from "react-vis"
import Head from 'next/head'

class ReactVisNext extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount () {
		console.log(this.props)

		let tempData = [];

		for(let iter=0; iter < 92; iter++) { 
			// There's some error for all the 100 elements.
			tempData.push({
                x: Date.parse(this.props.finDataKeys[iter]),
                y: this.props.finData[this.props.finDataKeys[iter]]["1. open"],
            })
		}

		this.setState({data: [...tempData]}, () => {
			console.log(this.state.data)
		});
	}
	
    render() {
        return (
            <React.Fragment>
                <React.Fragment>
                    <Head>
                        <title>react-vis-next</title>
                        <link
                            href="https://unpkg.com/react-vis/dist/style.css"
                            rel="stylesheet"
                            key="test"
                        />
                    </Head>
                </React.Fragment>

                <React.Fragment>
                    <div className="vis-container">
                        <XYPlot width={1200} height={600} xType="time">
                            <HorizontalGridLines />
                            <LineSeries data={this.state.data} />
                            <XAxis title="Date (US/Eastern)"/>
                            <YAxis title="Open" />
                        </XYPlot>
                    </div>
                </React.Fragment>
            </React.Fragment>
        )
    }
}

ReactVisNext.getInitialProps = async function() {
    const finFetch = await fetch(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo",
        { method: "GET" }
    )

    const finResponse = await finFetch.json()

    return {
        finMetaDataKeys: Object.keys(finResponse["Meta Data"]),
        finMetaData: finResponse["Meta Data"],
        finDataKeys: Object.keys(finResponse["Time Series (Daily)"]),
        finData: finResponse["Time Series (Daily)"],
    }
}

export default ReactVisNext