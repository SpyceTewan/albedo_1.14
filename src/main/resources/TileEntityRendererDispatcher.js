function initializeCoreMod() {
    return {
        'coremodone': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.renderer.tileentity.TileEntityRendererDispatcher'
            },
            'transformer': function(classNode) {
                var opcodes = Java.type('org.objectweb.asm.Opcodes')
                print("wah")

                var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode')
                var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode')

                var api = Java.type('net.minecraftforge.coremod.api.ASMAPI');

                var methods = classNode.methods;

                for(m in methods) {
                    var method = methods[m];
                    if ((method.name.equals("render")||method.name.equals("func_203602_a"))&&method.desc.equals("(Lnet/minecraft/tileentity/TileEntity;DDDFIZ)V")) {
				        var code = method.instructions;
                        code.insertBefore(code.get(2), new MethodInsnNode(opcodes.INVOKESTATIC, "com/hrznstudio/albedo/event/RenderTileEntityEvent", "postNewEvent", "(Lnet/minecraft/tileentity/TileEntity;)V", false))
                        code.insertBefore(code.get(2), new VarInsnNode(opcodes.ALOAD, 1))
                        break;
                    }
                }

                return classNode;
            }
        }
    }
}