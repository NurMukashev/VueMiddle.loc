import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";
export default{

    components: {
        AssignmentList,
        AssignmentCreate,
    },

    template: `
        <div class="flex gap-2">
            <button
                @click="currentTag = tag"
                v-for="tag in tags"
                class="border rounded px-1 py-px text-xs"
                :class="{
                    'border-blue-500 text-blue-500' : tag === currentTag
                }"
                >{{ tag }}</button>
        </div>
        <assignment-list :assignments="filters.inProgress" title="InProgress"></assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>
        
        <assignment-create @add="add"></assignment-create>
    `,

    data(){
      return {
        assignments: [
            {name:'Finish the project', complete:false, id:1, tag:'science'},
            {name:'Meeting with partners', complete:false, id:2, tag:'biology'},
            {name:'Hire a consultant', complete:false, id:3, tag:'physics'},
        ],

        currentTag: 'all',
      };
    },

    computed: {
        filters(){
            return {
                inProgress: this.filteredAssignments.filter(assignment => !assignment.complete),
                completed: this.filteredAssignments.filter(assignment => assignment.complete)
            };
        },
        filteredAssignments(){
            if(this.currentTag === 'all'){
                return this.assignments;
            }

            return this.assignments.filter(a => a.tag === this.currentTag);
        },

        tags(){
           return ['all', ...new Set(this.assignments.map(a => a.tag))];
        }
    },

    methods: {
        add(name){
            this.assignments.push({
                name: name,
                completed: false,
                id: this.assignments.length + 1,
            });
        },
    },

}