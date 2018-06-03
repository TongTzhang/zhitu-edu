var homeList = new Vue({
	el: "#box-list",
	data: {
       lists:[],
       num:[],
       list:[],
       sub:[],
       grade:[],
       gradeId:[],
       teacherType: [],
       subject:[],
       listGrade: [],
       gradeNumm: [],
       grade: '年级',
       sub: '学科',
	   teacherType: '教师类型',
	   select: 0,
	   isShow: false,
	},
	mounted:function(){
		this.getData();
	},
	methods:{
		blur:function(index){
			console.log(this.select);
			this.select = index;
			this.isShow = !this.isShow;
		},
		clickIndex:function(itemp){
			this.gradeId = itemp.id;
			this.grade = itemp.label;
			this.gradeNumm = this.gradeId;
			console.log(this.gradeNumm)
	    },
	    clickIn:function(itemo){
			this.subId = itemo.id;
			this.sub = itemo.label;
			this.subNumm = this.subId;
			console.log(this.subNumm)
	    },
	    clickOut:function(itemi){
			this.typeId = itemi.id;
			this.teacherType = itemi.label;
			this.typeNumm = this.typeId;
			console.log(this.typeNumm)
	    },
		getData:function(){
			function getQueryStringArgs() {
		        var qs=(location.search.length > 0 ? location.search.substring(1) : "");
		        var args={};
		        itemm = qs.length ? qs.split("&") : [],
		        console.log(itemm)
		        item=null,
		        name=null,
		        value=null,
		        i=0;
		        len=itemm.length;
		        for(i=0;i<len;i++){
		             item = itemm[i].split("=");
		             name = decodeURIComponent(item[0]);
		             value = decodeURIComponent(item[1]);
		             if(name.length){
		                 args[name] = value;
		             }
		         }
		        return args;
		    }
		    var args = getQueryStringArgs();
		    var subjectId = args["id"];
		    var subjectNum = args["name"];
		    var gradeNum = this.gradeNumm;
		    var that = this;
            $.ajax({
	           	url: "http://api.zhituteam.com/api/teacher/lists",
	           	type: "get",
	           	dataType: "json",
	           	data:{
	                subject: subjectId,
	                grade: gradeNum,
	                offset: 0,
	                limit: 20,
	                // grade: '年级',
				 //    sub: '学科',
					// teacherType: '教师类型',
	           	},
	           	success:function(res){
	                that.lists = res.data;
	                console.log(that.lists)
	                that.num = res.data.condition;
	                that.sub = subjectNum;
	                // gradeNum = that.gradeId;
	                // that.grade = that.clickIndex().gradeNum;
	                // console.log(res.data.grade)
	                // this.subjectId = res.data.subject.id;
	           	}
           })
		}
	}
})