<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Memberlist Class
 *
 * @package     ExpressionEngine
 * @category        Plugin
 * @author      Jane Doe
 * @copyright       Copyright (c) 2010, Jane Doe
 * @link        http://example.com/memberlist/
 */

$plugin_info = array(
    'pi_name'         => 'List Id Projects',
    'pi_version'      => '1.0',
    'pi_author'       => 'Konstantin Cherniak',
    'pi_author_url'   => 'http://galvstroy365.ru/',
    'pi_description'  => 'List Id Projects',
    'pi_usage'        => Idprojects::usage()
);

class Idprojects
{

    public $return_data = "";

    // --------------------------------------------------------------------

    /**
     * Idprojects
     *
     * This function returns a list of members
     *
     * @access  public
     * @return  string
     */
    public function __construct()
    {
        $userid = '1';
        $type = 'ids';
        $userid = ee()->TMPL->fetch_param('userid');

        $type = ee()->TMPL->fetch_param('type');
       

        $query = ee()->db->select('field_id_47 AS idpr')
        ->from('channel_data')
        ->join('channel_titles', 'channel_data.entry_id = channel_titles.entry_id')
        ->where(array(
            'channel_titles.author_id' => $userid,
            'channel_titles.channel_id' => 4,
            'channel_titles.status' => 'open'
        ))
        ->order_by('channel_titles.entry_date', 'desc')
        ->get();

        if ($type == "ids" || $type == ""  )
        {
            if ($query->num_rows() > 0 )
            {
                
                foreach($query->result_array() as $row)
                {
                    $this->return_data .= $row['idpr']."|";
                }
            } 
            else 
            {
                $this->return_data .= "0";
            }
        }

        if ($type == "count" )
        {
             if ($query->num_rows() > 0 )
            {
                $arrids = array ();
                foreach($query->result_array() as $row)
                {
                    array_push($arrids, $row['idpr']);
                }
                $this->return_data .= count(array_unique($arrids));
            } 
            else 
            {
                $this->return_data .= "0";
            }
        }

       

  
        /*
        $group_id = "6";
        $group_id = ee()->TMPL->fetch_param('group_id');
        $query = ee()->db->select('email')
            ->where('group_id =', $group_id)
            ->get('members', 1000);
        $count=1;
        foreach($query->result_array() as $row)
        {
            $this->return_data .= $row['email'];
            if ( $count < $query->num_rows() ){
            $this->return_data .= ",";
            }
            $count++;
        }
        */
    }

    // --------------------------------------------------------------------

    /**
     * Usage
     *
     * This function describes how the plugin is used.
     *
     * @access  public
     * @return  string
     */
    public static function usage()
    {
        ob_start();  ?>

Idprojects

    {exp:idprojects userid='111'}

This is an incredibly simple Plugin.
Parametrs: <br>
userid User ID<br>


    <?php
        $buffer = ob_get_contents();
        ob_end_clean();

        return $buffer;
    }
    // END
}
/* End of file pi.memberlist.php */
/* Location: ./system/expressionengine/third_party/memberlist/pi.memberlist.php */