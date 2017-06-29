module.exports = function(app, bookVO) {

	app.get('/insert', function(req, res) {
		res.render('input_form', {
			item : vo,
			action : '/insert',
			pageTitle : '추가'

		});

	})

	app.post('/insert', function(req, res) {
		var vo = new bookVO(req.body);// 폼에서 넘겨준 값으로 채워진 vo생성
		vo.save(function(err, data) {
			var vo = new bookVO();
			res.redirect('/list');
		})

	})

	app.get('/list', function(req, res) {
		bookVO.find(function(err, data) {
			res.render('list', {
				list : data
			})
		})

	})

	app.post('/list', function(req, res) {
		// 폼에서 넘겨준 검색값
		var sTitle = req.body.strTitle;
		bookVO.find({
			strTitle : {// strTitl중에서 sTitle로 시작하는 문자열를 찾아라
				$regex : new RegExp(sTitle, 'ig')
			}
		}, function(err, data) {
			res.render('list', {
				list : data
			})
		})

	})

	app.get('/update/:id', function(req, res) {
		var id = req.params.id

		bookVO.findOne({
			_id : id
		}, function(err, data) {
			res.render('input_form', {
				item : data,
				pageTitle : '수정',
				action : '/update'
			})
		})

	})

	app.post('/update', function(req, res) {
		var id = req.body.id;
		bookVO.update({
			_id : id
		}, {
			$set : req.body
		}, function(err, data) {
			res.redirect('/list')
		})
	})

	app.get('/delete/:id', function(req, res) {
		var id = req.params.id
		bookVO.remove({
			_id : id
		}, function(err, data) {
			res.redirect('/list')
		})
	})

}