
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM estabelecimento',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('estabelecimentos',{page_title:"Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_estabelecimento',{page_title:"Add Estabelecimentos - Node.js"});
};
exports.addImage = function(req, res){
  res.render('add_image',{page_title:"Adicionar Imagem- Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM estabelecimento WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_estabelecimento',{page_title:"Editar Estabelecimentos - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {

        var data = {
            
            nome      : input.nome,
            endereco  : input.endereco,
            numero    : input.numero,
            cep       : input.cep, 
            bairro    : input.bairro,
            cidade    : input.cidade,
            estado    : input.estado,
            telefone  : input.telefone
        
        };
        

        var query = connection.query("INSERT INTO estabelecimento set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/estabelecimentos');
          
        });
        
       // console.log(query.sql); get raw query
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            nome      : input.nome,
            endereco  : input.endereco,
            numero    : input.numero,
            cep       : input.cep, 
            bairro    : input.bairro,
            cidade    : input.cidade,
            estado    : input.estado,
            telefone  : input.telefone
        
        };
        
        connection.query("UPDATE estabelecimento set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/estabelecimentos');
          
        });
    
    });
};


exports.delete_estabelecimento = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM estabelecimento  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/estabelecimentos');
             
        });
        
     });
};
