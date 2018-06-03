var app = new Vue ({
	el:"#app",
	data:{
		teacherList:[],
	},
	mounted: function(){
		this.geidata();
	},
	methods:{
		geidata: function(){
			var that = this;
			var num=window.location.search.split("=")[1];
			$.ajax({
				url:"http://api.zhituteam.com/api/teacher/info",
				type:"get",
				dataType:"json",
				data:{
					id:num,
				},
				success:function(res){
					that.teacherList = res.data.teacher;
				},
				error: function(error){
					console.log("that.teacherList");
				},
			});
		}
	}
})