                 <View style={{flex:1}}>
                        <View style={{height:10}} />
                        <DropdownMenu
                        style={{flex: 1}}
                        bgColor={'green'}
                        tintColor={'black'}
                        activityTintColor={'black'}
                        // arrowImg={}      
                        // checkImage={}   
                        optionTextStyle={{color: 'grey'}}
                        titleStyle={{color: 'grey'}} 
                        maxHeight={50} 
                        handler={(selection, row) => this.setState({tipoAve: data[selection][row]})}
                        data={data}
                        >
                
                        {/* <View style={{flex: 1}}>
                            <Text>
                            {this.state.tipoAve} is the best language in the world
                            </Text>
                        </View> */}
                
                        </DropdownMenu>
                    </View>
                // <View style={{alignItems:'center'}}>
                // <TouchableOpacity style={styles.input} onPress={this.mostrarCalendario} value={this.fechaElegida}>
                // <Text style={styles.input}> Seleccione fecha inicio de la incubación </Text>
                // </TouchableOpacity>
                // </View>