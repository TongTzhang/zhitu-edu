var app = new Vue ({
	el:"#app",
	data:{
		subjectList:[],
		teacherList:[],
		bannerList:{},
	},
	mounted: function(){
		this.getdata();
	},
	methods:{
		getdata: function(){
			var that = this;
			$.ajax({
				url:"http://api.zhituteam.com/api/index",
				type:"get",
				dataType:"json",
				data:{},
				success:function(res){
					that.subjectList = res.data.subjects;
					that.teacherList = res.data.teacher;
					that.bannerList = res.data.banner;

				},
				error: function(error){},
			});
		}
	}
})