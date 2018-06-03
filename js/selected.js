function getSearchData(){
	var qs=(location.search.length > 0 ? location.search.substring(1) : "");
    var args={};
    itemm = qs.length ? qs.split("&") : [],
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
var app = new Vue({
	el:"#app",
	data:{
		isshow:false,
		grade:'年级',
		isShowGrade:false,
		searchGrade:null,
		subject: getSearchData() ? getSearchData().name :'学科',
		isShowSubject:false,
		searchSubject:null,
		teacherType:'教师类型',
		isShowType:false,
		searchType:null,
		list:{},
		teacherList:[],
		condition:null,

	},
	mounted: function(){
		this.searchSubject =getSearchData().id;
		var ajaxdata={
			'subject': this.searchSubject,
			'offset': 0,
            'limit': 20,
		};
		this.getData(ajaxdata);
	},
	methods:{
		getData: function(dataObj){
			var that = this;
			$.ajax({
				url:"http://api.zhituteam.com/api/teacher/lists",
				type:"get",
				dataType:"json",
				data:dataObj,
				success: function(res){
					that.list = res.data;
					that.teacherList = res.data.teacher;
					if(that.condition == null){
						res.data.condition.grade.forEach(function(ii){
						ii.isSelected = false;
						});
						res.data.condition.subject.forEach(function(ii){
							ii.isSelected = false;
						});
						res.data.condition.type.forEach(function(ii){
							ii.isSelected = false;
						});
						that.condition = res.data.condition;
						that.condition.subject.forEach(function(k){
							if(that.searchSubject == k.id){
								k.isSelected= true;
								that.isShowSubject = true;
							}
						});
					};
				},
				error: function(error){},
			})
		},
		closeGray: function(){
			this.isshow = false;
		},
		showGrade: function(){
			this.isShowGrade = true;
			this.isShowSubject = false;
			this.isShowType = false;
			this.isshow = true;
		},
		showSubject: function(){
			this.isShowGrade =  false;
			this.isShowSubject = true;
			this.isShowType = false;
			this.isshow = true;
		},
		showType: function(){
			this.isShowGrade =  false;
			this.isShowSubject = false;
			this.isShowType =true;
			this.isshow =true;
		},
		clickOption: function(item){
			this.condition.grade.forEach(function(t){
				t.isSelected = false;
			});
			this.condition.subject.forEach(function(t){
				t.isSelected = false;
			});
			this.condition.type.forEach(function(t){
				t.isSelected = false;
			});

			item.isSelected = true;
			this.isshow = false;
			if(this.isShowType){
				this.teacherType = item.label;
				this.searchType = item.id;
			};
			if(this.isShowSubject){
				this.subject = item.label;
				this.searchSubject = item.id;
			};
			if(this.isShowGrade){
				this.grade = item.label;
				this.searchGrade = item.id;
			};
			var searchData = {
				'grade':this.searchGrade,
				'type' : this.searchType,
				'subject' : this.searchSubject,
                'offset': 0,
                'limit': 20,
			}
			this.getData(searchData);
		}
	},
})