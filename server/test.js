const models = require('./server.js').models;

// models.Profile.findOrCreate({name: 'bob'}, (err, profile)=>{
//   if (err) {
//     console.log('there was and error', err);
//   } else if (profile) {
// //     profile.updateAttributes({
// //       email: 'bob123@gmail.com',
// //     }, (updateError, updated)=>{
// //       console.log('updated???', updated);
// //     });
//     profile.email = 'bob22@gmial.com';
//     profile.save((ue, updated)=>{
//       console.log('updated?', updated);
//     });
//   }
// });

// const toSave = [
//     {name: 'Nick', email: 'nick23@gmail.com'},
//     {name: 'Nick2', email: 'nick123@gmail.com'},
//     {name: 'Nick3', email: 'nicka123@gmail.com'},
//     {name: 'Nick4', email: 'nickee23@gmail.com'},
//     {name: 'Nick5', email: 'nickar1@gmail.com'},
//     {name: 'Nick65', email: 'nick423@gmail.com'},
//     {name: 'Nick71', email: 'nik123@gmail.com'},
//     {name: 'Nick80', email: 'nik12@gmail.com'},
//     {name: 'Nick9', email: 'nicat123@gmail.com'},
//     {name: 'Nick10', email: 'nickat23@gmail.com'},
// ];

// toSave.map(obj=>{
//   models.Profile.create(obj, (err, created)=>{
//     console.log('Created!!!');
//   });
// });

/*
const filer1 = {
  where: {},
  order: 'date ASC',
  limit: 4,
    // include: ['user',{Posts:'image'}]
//   include: {posts: 'Image'},
include:{
    relation: 'Posts',
    scope:{
        limit: 5,
        order:'date DESC'
        include:{
            relation: 'Image',
            limit: 1,
            where: {type:'thumbnail'}
        }
    }
}
}; */

// models.Profile.findOne({where: {name: 'Nick4'}}, (err, found)=>{
    //   console.log('found???', err, found);
    // });
models.Profile.find({where: {name: 'Nick'}, order: 'id ASC'}, (err, found)=>{
  console.log('found???', err, found);
});
const filter1 = {
  where: {name: {like: 'Nick'}},
  order: 'id ASC',
  limit: 7,
  skip: 0,
  fields: {
    email: true,
  },
};

models.Profile.find(filter1, (err, found)=>{
  console.log('found--------------???', err, found);
});
models.Profile.findById('607bed7d35c09117b8d6e565', filter1, (err, found)=>{
  console.log('found-----BY-----ID----???', err, found);
    // found.destroy();
});
// models.Profile.destroyAll(filter1.where, (err, found)=>{
//   console.log('Desrtroyed-------------???', err, found);
//     // found.destroy();
// });
models.Profile.destroyById('607bfddce8a4cb0e78aae8d6', (err, found)=>{
  console.log('Desrtroyed-------------???', err, found);
    // found.destroy();
});
