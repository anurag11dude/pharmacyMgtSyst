import { Pipe, PipeTransform, Injectable } from '@angular/core';
@Pipe({
	name: 'search',
	pure: false
})
@Injectable()
export class search implements PipeTransform {
	 transform(items:any[], args:any, field:string = null):any[] {
		if(args == undefined) return items;
		var isSearch = (data:any): boolean => {
			var isAll = false;
			if(typeof data === 'object' ){
				if(field){
					let cond = data[field] || 'false';
					isAll = cond == "false" ? false : isSearch(data[field]);
				}else{
					for (var z in data) {
						if(isAll = isSearch(data[z]) ){
							break;
						}
					}
				}
			} else {
				if(typeof args === 'number'){
					isAll = data === args;
				} else {
					isAll = data.toString().match( new RegExp(args, 'i') );
				}
			} 

			return isAll;
		};

		return items.filter(isSearch);
	}
}
@Pipe({
	name: 'replacestr',
	pure: false
})
@Injectable()
export class replacestr implements PipeTransform {
	transform(value:string, from:string, to:string): string {
		value = value || '';
		from = from || '';
		to = to || '';
		return value.replace(new RegExp(from, 'g'), to);
	};
}