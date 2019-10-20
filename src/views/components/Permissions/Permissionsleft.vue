<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index" @click="$emit('btn',item.id)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Permissionsleft",
    props:{
        list: Array
    }
}
</script>