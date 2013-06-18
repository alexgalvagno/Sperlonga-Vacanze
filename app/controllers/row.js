var args = arguments[0] || {};

$.row.id = args.id;
if(Ti.Platform.osname === "android") $.row.title = args.title;

$.title.text = args.title;

if(args.id != 0) $.row.hasChild = true;

if(args.rate != null){
	
	$.title.width = '65%';
	$.rate.width = '30%';
	
	if(args.rate != 0){
		var star = Ti.UI.createImageView({
			height: '15dp',
			right: 0
		});
		
		switch(parseInt(args.rate)){
	    	case 1:
	        	star.image = "/images/star1.png";
	            break;
	        case 2:
	            star.image = "/images/star2.png";
	            break;
	        case 3:
	            star.image = "/images/star3.png";
	            break;
	        case 4:
	            star.image = "/images/star4.png";
	            break;
	        case 5:
	            star.image = "/images/star5.png";
	            break;
	    }
			
		$.rate.add(star);
	}
}
