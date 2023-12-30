import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";
import AssignmentTags from "./AssignmentTags.js";
export default{

    components: {
        AssignmentList,
        AssignmentCreate,
        AssignmentTags,
    },

    template: `
        <assignment-tags
            v-model:currentTag="currentTag" 
            :initial-tags="assignments.map(a => a.tag)"
        />
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