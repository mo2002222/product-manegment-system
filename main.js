let titel = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("creat");
let total = document.getElementById("total");
let table = document.querySelector(".table-elements");
let deleteAll = document.getElementById('delete-all');
let val = document.getElementById('val');
let updatebtn = document.querySelector('update');
let searchByCate = document.getElementById('by-category');
let searchByTitle = document.getElementById('by-titel');
let searchbtn = document.getElementById('searsh');
let mood= 'create';
let tmp;
//get total
function getTotal(){
    if (price.value != '') {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }else{
        total.innerHTML = '';
        total.style.background = "#a00d02";
    };
    if (price.value == '') {
        total.style.transform = "scale(1.1)"
        // total.innerHTML = 'pleace insert price'
    }
};
//check if localstorage is empty and creat array
let datapro;
if (localStorage.getItem('product') != null) {
    datapro= JSON.parse(localStorage.getItem('product'));
}else{
    datapro=[];
}
//creat button event
create.addEventListener("click",(e)=>{
//creat object carry of inputs values
let newpro = {
    titelobj :titel.value.toLowerCase(),
    priceob :price.value,
    taxesobj : taxes.value,
    adsobj : ads.value,
    discobj : discount.value,
    totalobg : total.innerHTML,
    countobj : count.value,
    categoryobj : category.value.toLowerCase(),
}
//creat number of products bassed on count value
if (titel.value != '' && price.value != ''&& newpro.countobj <= 100) {
    if (mood == 'create') {
        if (newpro.countobj > 1) {
            for (let i = 0; i < newpro.countobj; i++) {
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
            
        }
    }else{
        datapro[tmp] = newpro;
        mood='create';
        create.innerHTML = 'Create';
        
    }
}

// save array content in localstorage
localStorage.setItem('product',JSON.stringify(datapro));
clrarinp();
showData();
});

//clear inputs
function clrarinp() {
    titel.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
};
//show data in the table
function showData() {
    let tabl ='';
    for (let i = 0; i < datapro.length; i++) {
        tabl+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].titelobj}</td>
                        <td>${datapro[i].priceob}</td>
                        <td>${datapro[i].taxesobj}</td>
                        <td>${datapro[i].adsobj}</td>
                        <td>${datapro[i].discobj}</td>
                        <td>${datapro[i].totalobg}</td>
                        <td>${datapro[i].categoryobj}</td>
                        <td><button class="update" onclick ="updateData(${i})">Update</button></td>
                        <td><button class="delete" onclick ="deleteData(${i})" >Delete</button></td>
                    </tr> `
        
    }
    table.innerHTML = tabl;
    //show and hide delet all button based on elements is founded
    if (datapro.length == 0) {
        deleteAll.style.display = 'none'
    }else{
        deleteAll.style.display = 'block'
    };
    val.innerHTML = datapro.length;
    getTotal();
};
showData();
// delete an product when click delete button
function deleteData(i) {
    datapro.splice(i,1)
    localStorage.setItem('product',JSON.stringify(datapro))
    showData();
};
// delet all button
function DeleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
};
//updtate button
function updateData(i) {
    titel.value = datapro[i].titelobj;
    price.value = datapro[i].priceob;
    taxes.value = datapro[i].taxesobj;
    ads.value = datapro[i].adsobj;
    discount.value = datapro[i].discobj;
    total.innerHTML = datapro[i].totalobg;
    category.value = datapro[i].categoryobj;
    create.innerHTML = 'Update';
    mood='update';
    tmp=i;
    scroll({
        top : 0 ,
        behavior:'smooth'
    })
    getTotal();
}
//search function
let searchMood = 'title';








function getSearchMood(id) {
    if(id == 'by-titel'){
        searchMood = 'title'
    }else{
        searchMood = 'category'
    }
    searchbtn.placeholder = 'Search By ' + searchMood;
    searchbtn.focus();
    searchbtn.value = '';
    showData();
}
// 
function searchData(value) {
    let tabl = '';
    if (searchMood === 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].titelobj.includes(value.toLowerCase())) {
                tabl+=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].titelobj}</td>
                        <td>${datapro[i].priceob}</td>
                        <td>${datapro[i].taxesobj}</td>
                        <td>${datapro[i].adsobj}</td>
                        <td>${datapro[i].discobj}</td>
                        <td>${datapro[i].totalobg}</td>
                        <td>${datapro[i].categoryobj}</td>
                        <td><button class="update" onclick ="updateData(${i})">Update</button></td>
                        <td><button class="delete" onclick ="deleteData(${i})" >Delete</button></td>
                    </tr> `
            }
            
        }








    }else{
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].categoryobj.includes(value.toLowerCase())) {
                tabl+=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].titelobj}</td>
                        <td>${datapro[i].priceob}</td>
                        <td>${datapro[i].taxesobj}</td>
                        <td>${datapro[i].adsobj}</td>
                        <td>${datapro[i].discobj}</td>
                        <td>${datapro[i].totalobg}</td>
                        <td>${datapro[i].categoryobj}</td>
                        <td><button class="update" onclick ="updateData(${i})">Update</button></td>
                        <td><button class="delete" onclick ="deleteData(${i})" >Delete</button></td>
                    </tr> `
            }
            
        }

    }
    table.innerHTML = tabl;
}

//clean data



