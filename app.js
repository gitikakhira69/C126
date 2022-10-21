import React from "react"
import PickImage from "./imagedetection"
export default class App extends React.Component{
    render(){
        var {image} = this.state

        return(
            <View style = {{flex:1,alignitems:"center",justifyContent:"center"}}>
                <Button title="Pick An Image From Camera Roll" onPress={this._pickimage}/>
            </View>
        )
    }
    getPermissionasync = async()=>{
        if(Platform.OS !== "web"){
            const{status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status !== "granted"){
            alert("Sorry!,we need camera permission to make it work")
        }
        }
    }
    componentDidMount(){
        this.getPermissionasync()
    }
    _pickimage=async()=>{
        try{
            var result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypesOptions.All,
                allowsEditing : true,
                aspect : [4,3],
                quality : 1,
            })
            if(!result.cancelled){
                this.setState({
                    image:result.data
                })
                this.uploadImage(result.uri)
            }
        }
        catch(E){
            console.log(E)
        }
    }
    uploadImage=async(uri)=>{
        const data = new FormData()
        var filename  = uri.split("/")[uri.split("/").length-1]
        const filetoupload = {
            uri:uri,
            name:filename,
            type:type,
        }
        data.append("Digit",filetoupload)
        fetch("https://07afd951a187.ngrok.i o/predict-digit",{
            method:"POST",
            body:data,
            headers:{
                "content-type":"multipart/form-data",
            },
        })
        .then((response)=>response.json())
        .then((result)=>{
            console.log("Success",result)
        })
        .catch((Error)=>{
            console.log("Error",Error)
        })
    }

}

