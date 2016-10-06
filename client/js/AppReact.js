window.ee = new EventEmitter();

var Article = React.createClass({
	propTypes: {
		data: React.PropTypes.shape({
			author: React.PropTypes.string.isRequired,
			text: React.PropTypes.string.isRequired,
			bigText: React.PropTypes.string.isRequired
		})
	},
	getInitialState: function () {
		return {
			visible: false
		};
	},
	readMoreClick: function (e) {
		e.preventDefault();
		this.setState({visible: !this.state.visible});
	},
	render: function () {
		var data = this.props.data;
		return (
			<div>
				<p className="news__author">{data.author}:</p>
				<p className="news__text">{data.text}</p>
				<a onClick={this.readMoreClick} href="#" className='news__readmore'>Подробнее</a>
				<p className={"news__bigText " + (this.state.visible ? '' : 'hide')}>{data.bigText}</p>
			</div>
		);
	}
});

var TestInput = React.createClass({
	getInitialState: function() {
		return {
			agreeChecked: true,
			authorIsEmpty: true,
			textIsEmpty: true
		};
	},
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.authorTestInput).focus();
	},
	onBtnClickHandler: function (e) {
		e.preventDefault();
		var author = ReactDOM.findDOMNode(this.refs.authorTestInput).value;
		var textEl = ReactDOM.findDOMNode(this.refs.textTestInput);
		var item = [{
			author: author,
			text: textEl.value.slice(0, 20) + ' ...',
			bigText: textEl.value
		}];
		window.ee.emit('News.add', item);
		textEl.value = '';
		this.setState({textIsEmpty: true});
	},
	onCheckRuleClick: function(e) {
		this.setState({agreeChecked: !this.state.agreeChecked});
	},
	textChange: function(fieldName, e) {
		if (e.target.value.trim().length > 0) {
			this.setState({[''+fieldName]:false})
		} else {
			this.setState({[''+fieldName]:true})
		}
	},
	render: function () {
		var agreeChecked = this.state.agreeChecked,
			authorIsEmpty = this.state.authorIsEmpty,
			textIsEmpty = this.state.textIsEmpty;
		return (
			<div className='input-group'>
				<input type='text' className='author' defaultValue='' ref='authorTestInput' placeholder="author" onChange={this.textChange.bind(this, 'authorIsEmpty')}/>
				<br></br>
				<textarea className='text' defaultValue='' ref='textTestInput' placeholder="text" onChange={this.textChange.bind(this, 'textIsEmpty')}/>
				<input type='checkbox' className='checkbox' ref='checkboxTestInput' onChange={this.onCheckRuleClick} />
				<button onClick={this.onBtnClickHandler} ref='inputBtn' disabled={agreeChecked || authorIsEmpty || textIsEmpty}> send </button>
			</div>
		)
	}
});

var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
	getInitialState: function () {
		return {
			visible: false
		};
	},
	coutNewsClick: function (e) {
		e.preventDefault();
		this.setState({visible: !this.state.visible});
	},
	render: function() {
		var data = this.props.data;
		var newsTemplate;

		if (data.length > 0) {
			newsTemplate = data.map(function(item, i) {
				return (
					<div key={i}>
						<Article data={item} />
					</div>
				)
			})
		} else {
			newsTemplate = <p>donot news</p>
		}

		return (
			<div className="news">
				{newsTemplate}
				<p className={'news-class ' + (data.length > 0 ? '':'hide')} onClick={this.coutNewsClick}> count news {this.state.visible ? data.length : ''}</p>
			</div>
		);
	}
});

var my_news = [
	{
		author: 'Саша Печкин',
		text: 'В четверг, четвертого числа...',
		bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero perspiciatis incidunt, sit enim magni porro autem reprehenderit natus eum, minus suscipit animi libero nulla nostrum id itaque obcaecati molestias voluptates.'
	},
	{
		author: 'Просто Вася',
		text: 'Считаю, что $ должен стоить 35 рублей!',
		bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius maiores iure suscipit facere nisi amet ut fugiat cupiditate iste odio, voluptatibus. Dolor nihil quidem, expedita veritatis. Quo maxime cum repudiandae.'
	},
	{
		author: 'Гость',
		text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
		bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum officia, consectetur fuga aliquid! Explicabo repellat rem molestias minus quae, consequuntur impedit modi! Velit architecto tempore laborum vitae totam a aliquid!'
	}
];

var App = React.createClass({
	getInitialState: function() {
		return {
			news: my_news
		};
	},
	componentDidMount: function() {
		var self = this;
		window.ee.addListener('News.add', function(item) {
			var nextNews = item.concat(self.state.news);
			self.setState({news: nextNews});
		});
	},
	componentWillUnmount: function() {
		window.ee.removeListener('News.add');
	},
	render: function () {
		return (
			<div className="app">
				text for App
				<TestInput />
				<News data={this.state.news} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.querySelector('#myDiv')
)
