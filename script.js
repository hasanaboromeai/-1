//  اسناديها للمتغيرات document.getElementByIdعن طريق html  الوصول لعناصر 
var studentName = document.getElementById('studentName');
var userName = document.getElementById('userName');
var birthDay = document.getElementById('birthDay');
var phoneNumber = document.getElementById('phoneNumber');
var program = document.getElementById('program');
var capcha = document.getElementById('capcha');
var verifyCode = document.getElementById('verifyCode');
var alerta = document.getElementById("alert");
var js = document.getElementById("json");
var tbod = document.getElementById("tbody");
var code = Math.round(Math.random() * 3000) + 1000;
var filt = document.getElementById("pro");
verifyCode.innerHTML = "<del>" + code.toString() + "</del>";
var students = new Array();
var studtojson = new Array();
// لكل حقل mata data وضع شروط  المتغيرات ل 
function addStudent(){
    if(studentName.value.length <= 0 ||userName.value.length <= 0 || birthDay.value.length <= 0 ||phoneNumber.value.length <= 0 ||program.value.length <= 0 ||capcha.value.length <= 0){
        alerta.innerHTML = "الرجاء تعبئة جميع الحقول";
    }else{
        if(capcha.value !== code.toString()){
            alerta.innerHTML = "كلمة التحقق غير صحيحة";
        }else if(userName.value.indexOf('_')  === -1){
            alerta.innerHTML = "يرجى استخدام التنسيق الآتي لاسم المستخدم name_12345";
        }else if(userName.value.slice(userName.value.indexOf("_")+1).length < 1){
            alerta.innerHTML = "خطا في تنسيق اسم المستخدم"
        }else if(!parseInt(userName.value.slice(userName.value.indexOf("_")+1))){
            alerta.innerHTML = "يرجى ادخال ارقام فقط في تنسيق اسم المستخدم";
        }else if(!parseInt(phoneNumber.value.slice(phoneNumber.value.indexOf("-")+1)) || !parseInt(phoneNumber.value.slice(0,phoneNumber.value.indexOf("-")))){
            alerta.innerHTML = "يرجى ادخال رقم الهاتف بالتنسيق الآتي 987654321-963";
        }
        else if(phoneNumber.value.indexOf("-")  === -1 || (phoneNumber.value.slice(0,phoneNumber.value.indexOf("-")).length < 1)){
            alerta.innerHTML = "يرجى ادخال رقم الهاتف بالتنسيق الآتي 987654321-963";
        }else if(parseInt(phoneNumber.value.slice(0,phoneNumber.value.indexOf("-"))) === 963 && phoneNumber.value.slice(phoneNumber.value.indexOf("-") + 1).length !== 9){
            alerta.innerHTML = "الأرقام السورية يجب ان تكون مؤلفة من 9 ارقام بعد النداء";
        }else if(parseInt(phoneNumber.value.slice(0,phoneNumber.value.indexOf("-"))) !== 963 && phoneNumber.value.slice(phoneNumber.value.indexOf("-") + 1).length !== 7){
            alerta.innerHTML = "الأرقام الغير السورية يجب ان تكون مؤلفة من 7 ارقام بعد النداء";
        }
        else{
            alerta.innerHTML = "تمت الإضافة بنجاح"
            var newstudent = {
                'no' : students.length + 1,
                'user_name' : userName.value,
                'student_name' : studentName.value,
                'phone_number' : phoneNumber.value,
                'birth_date' : birthDay.value,
                'program' : program.value,
                
            };
            studentName.value="";
            userName.value="";
            birthDay.value="";
            phoneNumber.value="";
            program.value="";
            capcha.value="";
        
            students.push(newstudent);
            change(1);
        }
    }
}
//Json عرض معلومات بواسطة 
function convertToJson(){
    if(studtojson.length > 0){
        js.value = JSON.stringify(studtojson);
    }
}
//عرض معلومات مفلترا حسب برنامج الطلاب 
function filter(){
    var filterBy = filt.value;
    var arr = new Array();
    if(filterBy !== "ALL"){
        for(i = 0;i<students.length;i++){
            if(students[i]['program'] === filterBy){
                arr.push(students[i]);
            }
        }
    }else{
        arr = students
    }
    change(1,arr);
}
function change(id, arr = students){
    var filterBy = filt.value;
    var arr2 = new Array();
    if(filterBy !== "ALL"){
        for(i = 0;i<arr.length;i++){
            if(arr[i]['program'] === filterBy){
                arr2.push(arr[i]);
            }
        }
    }else{
        arr2 = arr
    }
    arr2 = sortarr(arr2,id);
    var datatable = '';
    for(i = 0;i<arr2.length;i++){
        datatable += "<tr><td>" + arr2[i]['no'] + "</td><td>" + arr2[i]['user_name'] + "</td><td>" + arr2[i]['student_name'] + "</td><td>" + arr2[i]['program'] + "</td></tr>";
    }
    tbod.innerHTML = datatable;
    studtojson = arr2;
    return arr2;
}
//عرض معلومات مرتبة حسب  الاسم و البرنامج ورقم المستخدم 
function sortarr(array1,type){
    if(type === 1){
        for(var i = 0;i<array1.length;i++){
            for(var j = 0;j<array1.length-1;j++){
                if(array1[j]['user_name'].slice(array1[j]['user_name'].indexOf("_")) < array1[i]['user_name'].slice(array1[i]['user_name'].indexOf("_"))){
                    temp = array1[j];
                    array1[j] = array1[i];
                    array1[i] = temp;
                }
            }
        }
    }else if(type ===2){
        for(var i = 0;i<array1.length;i++){
            for(var j = 0;j<array1.length-1;j++){
                if(array1[j]['student_name'] < array1[i]['student_name']){
                    temp = array1[j];
                    array1[j] = array1[i];
                    array1[i] = temp;
                }
            }
        }
    }else if(type === 3){
        for(var i = 0;i<array1.length;i++){
            for(var j = 0;j<array1.length-1;j++){
                if(array1[j]['program'] < array1[i]['program']){
                    temp = array1[j];
                    array1[j] = array1[i];
                    array1[i] = temp;
                }
            }
        }
    }
    return array1;
}