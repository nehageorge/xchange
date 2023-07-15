import React from "react";
import { Text, View } from "react-native";
import XchangeTabbedHeader from "./XchangeTabbedHeader";

function LinkPageContent(pageName, paragraphs = []) {
    return(
        <div className="About">
            <XchangeTabbedHeader />
            <View style={{ flex: 1, paddingHorizontal: 45, paddingTop: 45, direction:"column" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold", paddingTop: 20, paddingBottom: 10}}>{pageName}</Text>
                <div className="Separator" style={{height:3, width: 500, background:"#E0D03B"}}> </div> 
                { paragraphs.map((para) => (
                    <div className="Paragraph" style={{paddingLeft:10}}>
                        <p style={{ fontSize: 24, fontWeight: "bold", paddingTop: 30}}>
                            {para[0]}
                        </p>
                        <p style={{ fontSize: 22, fontWeight:"normal", whiteSpace:"pre-wrap"}}>
                            {para[1]}
                        </p>
                    </div>
                ))}
            </View>
        </div>
    );
}

export default LinkPageContent;