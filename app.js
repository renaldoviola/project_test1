
/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes'),
    http    = require('http'),
    path    = require('path'),
    multer  = require('multer');

//load customers route
var estabelecimentos = require('./routes/estabelecimentos'); 
var app = express();

//middleware
var erros = require('./middleware/erros');

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'cardapcomrest'

    },'pool') //or single

);

//Para UpLoad de imagens
app.use(multer({ 
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' Carregando imagem ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' Imagem carregada:  ' + file.path)
        done=true;
    }
}));

app.post('/estabelecimentos/addImage',function(req,res){
  if(done==true){
    console.log(req.files);
    res.redirect('/estabelecimentos');
  }else{
    res.end('Erro ao subir a imagem.')
  }
});

app.get('/', routes.index);

app.get('/estabelecimentos', estabelecimentos.list);
app.get('/estabelecimentos/add', estabelecimentos.add);
app.post('/estabelecimentos/add', estabelecimentos.save);
app.get('/estabelecimentos/delete/:id', estabelecimentos.delete_estabelecimento);
app.get('/estabelecimentos/edit/:id', estabelecimentos.edit);
app.post('/estabelecimentos/edit/:id',estabelecimentos.save_edit);
app.get('/estabelecimentos/addImage', estabelecimentos.addImage);
//app.post('/estabelecimentos/addImage', estabelecimentos.saveImage);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Servidor Node iniciado... porta: ' + app.get('port'));
});
